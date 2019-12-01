import cache from "node-cache";
import url from "url";
import logger from "./logger";

export const apiCache = new cache();

type CacheTypes = "stats" | "drops" | "skills";
export const askCache = (req, res, next) => {
  const path = url.parse(req.url).pathname as CacheTypes;
  const [notUsed, cacheType, shipName] = path.split("/");

  const cached = apiCache.get<string>(`${shipName}.${cacheType}`);
  if (cached === undefined) {
    return next();
  }
  logger.info(`Read ${shipName} ${cacheType} from cache`);
  return res.json(JSON.parse(cached));
};
export default { apiCache, askCache };
