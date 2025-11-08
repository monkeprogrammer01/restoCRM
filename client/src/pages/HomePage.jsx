import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="">
      
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-4 leading-tight"
      >
        Enjoy Fine Dining <br /> Made Simple
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-500 text-lg mb-8"
      >
        Book tables, explore dishes, and manage your orders — all from one place.
      </motion.p>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="bg-primary text-white w-full py-3 rounded-2xl text-lg font-medium shadow-sm hover:shadow-md transition"
      >
        Reserve a Table
      </motion.button>
    </div>
  );
}
