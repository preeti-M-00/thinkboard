// import rateLimit from "../config/upstash.js";

// const rateLimiter = async (req,res,next) => {
//     //per user
//     try {
//         const {success} = await rateLimit.limit("my-rate-limit");

//         if(!success) {
//             return res.status(429).json({message: "Too many requests, please try again later"})
//         }

//         next()
//     } catch (error) {
//         console.log("Rate limit error", error)
//         next(error);
//     }
// }

// export default rateLimiter;