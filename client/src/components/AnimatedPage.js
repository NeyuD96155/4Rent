import { motion } from "framer-motion";

const pageTransition = {
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    },
};

const AnimatedPage = ({ children }) => {
    return (
        <motion.div
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
            // Thêm transition để kiểm soát tốc độ của hiệu ứng fade
            transition={{ duration: 1 }} // Điều chỉnh thời gian chuyển động ở đây
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;
