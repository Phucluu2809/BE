import fs from 'fs';  // File system để đọc ghi file
import path from 'path';  //  path dùng để xuli đường dẫndẫn

export const writeFileSync = (filePath, data) => {
  fs.writeFileSync(path.resolve(filePath), JSON.stringify(data, null, 2), 'utf-8');
};
export const readFileSync = (filePath) => {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf-8'));
};
//JSON.stringify(data, null, 2)  chuyển data thành JSON 
//'utf-8'mã hóa để ghi file