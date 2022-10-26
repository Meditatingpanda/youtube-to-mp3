import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import ytdl, { videoFormat } from "ytdl-core";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  const url = req.query.url;
  console.log(url);
  const v_id: string = (url as string).split("v=")[1];
  const info = await ytdl.getInfo(url as string);
  console.log(info.formats[4]);
  console.log(info.formats[1]);
  const Data = {
    url: "https://www.youtube.com/embed/" + v_id,
    // info: info.formats.sort((a:videoFormat, b:videoFormat) => {
    //   return true;
    // }),
    info: info.formats.sort((a: videoFormat, b: videoFormat) => {
      return a.mimeType > b.mimeType ? 1 : -1;
    }),
  };

  res.status(200).json(Data);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at Port:${port}`);
});
