import { motion } from 'framer-motion'
import skyImg from '../assets/Hero 3.jpg'

export default function SkyScreen({ opacity }) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <img src={skyImg} alt="" className="h-full w-full object-cover" draggable={false} />
    </motion.div>
  )
}
