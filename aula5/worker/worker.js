const { Client } = require("pg");
const Redis = require("ioredis");
const dns = require("dns");

const ctx = {};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function openDbConnection(connectionOptions) {
  let pgClient;

  while (true) {
    try {
      pgClient = new Client(connectionOptions);
      await pgClient.connect();
      break;
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        console.log("Waiting for DB");
        await sleep(1000);
      } else {
        console.log("Error connecting to DB:", error);
        await sleep(1000);
      }
    }
  }

  console.log("Connected to DB");

  try {
    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS votes (
        id VARCHAR(255) PRIMARY KEY,
        vote VARCHAR(255) NOT NULL
      )
    `);
  } catch (error) {
    console.log("Error creating table:", error);
  }

  return pgClient;
}

async function openRedisConnection() {
  let hostname = "cached";

  while (true) {
    try {
      const ipAddress = await getIP(hostname);
      console.log(`Found Redis at ${ipAddress}`);

      const redisClient = new Redis({
        host: ipAddress,
        port: 6379,
      });

      await redisClient.ping();
      console.log("Connected to Redis");

      return redisClient;
    } catch (error) {
      console.log("Waiting for Redis");
      await sleep(1000);
    }
  }
}

async function getIP(hostname) {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, { family: 4 }, (err, address) => {
      if (err) {
        reject(err);
      } else {
        resolve(address);
      }
    });
  });
}

async function updateVote(client, voterID, vote) {
  const queryInsert =
    "INSERT INTO votes (id, vote) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING";
  const queryUpdate = "UPDATE votes SET vote = $2 WHERE id = $1";

  try {
    await client.query(queryInsert, [voterID, vote]);
  } catch (error) {
    try {
      await client.query(queryUpdate, [voterID, vote]);
    } catch (error) {
      console.log("Error updating vote:", error);
    }
  }
}

const main = async () => {
  const pgClient = await openDbConnection({
    host: "database",
    user: "postgres",
    password: "postgres",
    database: "postgres",
  });

  const redisClient = await openRedisConnection("redis");

  const keepAliveCommand = "SELECT 1";

  let definition = {
    vote: "",
    voter_id: "",
  };

  while (true) {
    await sleep(100);

    // Reconnect Redis if down
    try {
      await redisClient.ping();
    } catch (error) {
      console.log("Reconnecting Redis");
      await redisClient.connect();
    }

    const data = await redisClient.lpop("votes");

    if (data !== null) {
      try {
        const definition = JSON.parse(data);
        console.log(
          `Processing vote for '${definition.vote}' by '${definition.voter_id}'`
        );

        // Reconnect DB if down
        try {
          await pgClient.query(keepAliveCommand);
        } catch (error) {
          console.log("Reconnecting DB");
          await pgClient.end();
          await openDbConnection({
            host: "database",
            user: "postgres",
            password: "postgres",
            database: "postgres",
          });
        } finally {
          // Normal +1 vote requested
          updateVote(pgClient, definition.voter_id, definition.vote);
        }
      } catch (error) {
        console.log("Error decoding JSON:", error);
      }
    } else {
      // Keep alive for PostgreSQL
      await pgClient.query(keepAliveCommand);
    }
  }
};

main().catch((error) => console.error(error));
