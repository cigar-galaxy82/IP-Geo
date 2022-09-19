import express from "express";
import { SuperfaceClient } from "@superfaceai/one-sdk";
const app = express();
app.set("trust proxy", true);
const sdk = new SuperfaceClient();

async function run(ip) {
  // Load the profile
  const profile = await sdk.getProfile("address/ip-geolocation@1.0.1");

  // Use the profile
  const result = await profile.getUseCase("IpGeolocation").perform(
    {
      ipAddress: ip
    },
    {
      provider: "ipdata",
      security: {
        apikey: {
          apikey: "9a511b6fc8334e1852cfbbd4ff3f1af3c42ed6abc75e96a1648b969a"
        }
      }
    }
  );

  // Handle the result
  try {
    const data = result.unwrap();
    return data;
  } catch (error) {
    console.error(error);
  }
}

app.use("/get/ip", async (req, res) => {
  console.log(req.ip);
  res.send(await run(req.ip));
});

app.listen(process.env.PORT||5000, () => {
  console.log("SERVER SRUNNING AT PORT 3000");
});
