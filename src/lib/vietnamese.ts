import { type Column, type SQL, sql } from "drizzle-orm";

const FROM =
  "ăâđêôơưàảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵĂÂĐÊÔƠƯÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬĐÈẺẼÉẸÊỀỂỄẾỆÌỈĨÍỊÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢÙỦŨÚỤƯỪỬỮỨỰỲỶỸÝỴ";
const TO =
  "aadeoouaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiioooooooooooooouuuuuuuuuuuuuuuuyyyyyAADEOOUAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOUUUUUUUUUUUUUUUUYYYYY";

export function sqlUnaccent(column: SQL | Column) {
  return sql`TRANSLATE(${column}, ${FROM}, ${TO})`;
}
