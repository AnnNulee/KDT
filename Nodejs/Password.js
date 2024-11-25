const crypto = require('crypto')

// const hash = crypto.createHash('sha256').update('abcdefghijklmnoasdfasdgahtrhewspiodofiojwej;klwe;jsdafsfdv,vlblbmrfdasdasdasd,dkekrkkkkfjviorjglkjtghkljth;lkdjh;lkdjg;klfdjglfkdjgkdljgdlfjgkfdflp').digest('hex');
// const hash2 = crypto.createHash('sha256').update('nl').digest('hex');
// // console.log(hash)

// crypto.pbkdf2('abcdefghijklmnop', 'addsugar', 100000, 64, 'sha512', (err, derivedkey) => {
//     if (err) throw err;
//     console.log(derivedkey.toString('hex'))
// }) // (비밀번호, 솔트값, 반복횟수, 해쉬코드의 길이, 알고리즘)



//// 양방향 암호, 복호화
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // 맵핑된 키가 있어야 된다. a 는 d로 쓰겠다 이런거. 
const iv = crypto.randomBytes(16);  // 무슨값이 들어오던, key와 algorithm을 초기화시켜주는 vector 

//암호화
 
const cipher = crypto.createCipheriv(algorithm, key, iv)
let encrypted = cipher.update('strongpassword', 'utf8', 'base64')  // 암호화 시키기. // 문자로 변환해줘야하니까 utf8같은거 써줘야됨 
encrypted += cipher.final('base64'); // 암호화된 결과 저장.

//복호화
const decipher = crypto.createDecipheriv(algorithm, key, iv)
let decrypted = decipher.update(encrypted, 'base64', 'utf8')
decrypted += decipher.final('utf8')

console.log(encrypted)
console.log(decrypted)