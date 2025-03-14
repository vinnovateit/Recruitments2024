import React from 'react';
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import CustomCursor2 from './CursorAnimation2';

const LoginScreen = () => {
  return (
    <div className="overflow-x-hidden flex flex-col justify-between h-screen bg-specpurple font-Fixture relative">
      <CustomCursor2/>
      {/* Top section with logos */}
      <div className="relative w-full pt-6 px-4">
        <motion.div 
          className="absolute top-0 left-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <svg
            className="w-16 md:w-24"
            viewBox="0 0 129 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_56_3802)">
              <path
                d="M3.94072 3.27278C3.94072 3.27278 -7.6574 33.1742 7.87169 43.32C23.4008 53.4659 27.0135 18.6703 42.7494 27.7032C56.6596 35.688 36.1137 52.3997 54.2856 62.1731C72.4575 71.9464 83.7558 50.5554 83.7558 50.5554C83.7558 50.5554 88.4395 38.1416 74.4525 39.7015C60.4654 41.2614 57.6788 54.8699 78.6939 66.248C99.709 77.6261 108.971 62.9123 108.971 62.9123"
                stroke="white"
                strokeWidth="30"
                strokeLinecap="round"
              />
              <path
                d="M3.94072 3.27278C3.94072 3.27278 -7.6574 33.1742 7.87169 43.32C23.4008 53.4659 27.0135 18.6703 42.7494 27.7032C56.6596 35.688 36.1137 52.3997 54.2856 62.1731C72.4575 71.9464 83.7558 50.5554 83.7558 50.5554C83.7558 50.5554 88.4395 38.1416 74.4525 39.7015C60.4654 41.2614 57.6788 54.8699 78.6939 66.248C99.709 77.6261 108.971 62.9123 108.971 62.9123"
                stroke="#F94AC9"
                strokeWidth="15"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </motion.div>

        <motion.div 
          className="absolute top-0 right-2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img 
            src="/thundericon.png" 
            alt="Thunder Icon" 
            className="w-16 md:w-24"
          />
        </motion.div>
      </div>

      {/* Main content section */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 pt-12 pb-8">
        <motion.div 
          className="text-center mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">Welcome to VinnovateIT</h1>
          <p className="text-white/80 text-lg">Where Innovation Meets Excellence</p>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 w-full md:w-3/5 lg:w-70vw max-w-4xl relative border border-white/20 shadow-2xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ borderColor: "rgba(163, 230, 53, 0.5)" }}
        >
          <motion.button
            onClick={() => signIn("google")}
            className="w-full bg-white text-specpurple px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-3 group"
            whileHover={{ scale: 1.02, backgroundColor: "#9FFF47" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
            </motion.div>
            Sign in with Google
          </motion.button>

          <motion.div 
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
              <motion.div
              className="bg-lime-500/10 rounded-lg p-4 border border-lime-500/30 my-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              whileHover={{ backgroundColor: "rgba(132, 204, 22, 0.15)" }}
            >
              <p className="text-lime-200 text-sm font-medium text-center">
                <span className="text-lime-400 font-bold">📋 Please Note:</span> Read all guidelines carefully before filling out the application form. Your understanding of these principles will reflect in your application process.
              </p>
            </motion.div>
            <h2 className="text-white text-2xl font-semibold mb-4 text-center"><u>Guidelines</u></h2>
          
          </motion.div>
            <motion.ul className="text-white/90 space-y-2 mb-4 text-sm list-none">
              {[
                "Perfect for freshers and sophomores looking to kickstart their innovation journey",
                "Open to all branches - because great ideas know no boundaries",
                "Choose your path: Technical, Management, or Design - where would you shine?",
                "Show us your creativity and passion - perfection isn't required, enthusiasm is!"
              ].map((text, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-2 p-2 rounded-lg"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  
                  <span><span className="text-lime-400 text-lg">• </span>{text}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            
          
          <motion.p 
            className="text-white/90 text-center font-bold text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Take the first step into becoming part of the
            <span className="text-lime-400"> VinnovateIT family </span>
            - where innovation never sleeps!
          </motion.p>

          <motion.div
            className="mt-6 pt-4 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <div className="bg-yellow-500/10 rounded-lg p-3 mb-3">
              <p className="text-yellow-200 text-sm font-medium">
                <span className="text-yellow-400">⚠️ Important:</span> You can only fill this form once. Make sure all information is accurate before submitting.
              </p>
            </div>
            
            <div className="bg-purple-500/10 rounded-lg p-3">
              <p className="text-purple-200 text-sm font-medium">
                <span className="text-purple-300">🔍 Insider tip:</span> Explore the website to discover hidden surprises that could help you in future interviews! The curious ones always find the treasures.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;