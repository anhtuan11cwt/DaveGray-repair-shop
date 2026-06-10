import { type Column, type SQL, sql } from "drizzle-orm";

const FROM =
  "ăâđêôơưàảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵĂÂĐÊÔƯƠÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬĐÈẺẼÉẸÊỀỂỄẾỆÌỈĨÍỊÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢÙỦŨÚỤƯỪỬỮỨỰỲỶỸÝỴ";
const TO =
  "aadeoouaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiioooooooooooooouuuuuuuuuuuuuuuuyyyyyAADEOOUAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOUUUUUUUUUUUUUUUUYYYYY";

// Hàm SQL loại bỏ dấu tiếng Việt để tìm kiếm không phân biệt có dấu
export function sqlUnaccent(column: SQL | Column) {
  return sql`TRANSLATE(${column}, ${FROM}, ${TO})`;
}
