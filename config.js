module.exports = {
    // ตั้งค่า Token ของบอท
    token: "",

    // ตั้งค่า prefix ของบอท
    prefix: "!",

    // สำหรับเบสที่เป็น Steam ให้ปรับเป็น true สำหรับเบสที่ใช้งานเป็น License ให้ปรับเป็น false 
    steam: false,

    // ตั้งค่าฐานข้อมูล
    
    host: "localhost", // โดย defualt จะเป็น localhost
    user: "root", // โดย defualt จะเป็น root
    password: "", // โดย defualt จะเป็นค่าว่าง
    database: "", // ชื่อฐานข้อมูล


    // ตั้งค่าข้อความ และ ชื่อเซิฟกับไอคอนเซิฟเวอร์
    messageban: "ไอดีนี้ถูกแบน",
    servername: "ไอเวง",
    iconURL: "https://cdn.discordapp.com/attachments/1100093108965879811/1104477628561358998/TopPNG.png",

    // ไอดีห้องสำหรับ LOG
    channelid: "1104857062879526922",

    
    // ตั้งค่าคำสั่ง

    commandsBanCheck: "bancheck",
    
    commandsBanlicense: "banlicense",

    commandsBansteam: "bansteam",

    commandsUnban: "unban"
}