const fs = require("fs")

const logReqRes = (filename) =>{
    return (req,res,next) =>{
    const logText =  `\n${Date.now()}: ${req.ip}, ${req.method}, ${req.path}`
        fs.appendFile(filename, logText,(err)=>{
            if(err){
                console.error("Error writing to log file:", err);
            }
            next();
            }
        )
    }
} 
module.exports = logReqRes;