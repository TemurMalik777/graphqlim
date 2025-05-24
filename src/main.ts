import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get<number>("API_PORT");
  await app.listen(process.env.PORT ?? 3006, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
  });
}
bootstrap();
