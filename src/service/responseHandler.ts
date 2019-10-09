import Response from "puppeteer";
import request = require("request");
const responseHandler = (resolve: Function, reject: Function) => (respEvent: Response) => {
  return ((respEvent, resolve: Function) => {
    try {
      // @ts-ignore
      if (respEvent.url().match('(?=.*comment_service_ajax).*')) {

        // @ts-ignore
        request(
          {
            uri: `https://www.udemy.com/api-2.0/courses/${
              123
            }/cached-subscriber-curriculum-items/?page_size=1400&fields[lecture]=@min,object_index,asset,supplementary_assets,sort_order,is_published,is_free&fields[quiz]=@min,object_index,title,sort_order,is_published&fields[practice]=@min,object_index,title,sort_order,is_published&fields[chapter]=@min,description,object_index,title,sort_order,is_published&fields[asset]=@min,title,filename,asset_type,external_url,length,status`,
            method: 'GET',
            headers: {
              authorization: `Bearer `
            }
          },
          (error, response, body) => {
            try {
              resolve(JSON.parse(body).results);
            } catch (err) {
              reject(err);
            }
          }
        );
      }
    } catch (err) {
      throw err;
    }
  })(respEvent, resolve);
};

export default responseHandler;
