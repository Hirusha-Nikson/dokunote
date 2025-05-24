"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function AboutDeveloper() {
  return (
    <section className="relative py-20 px-6 text-foreground overflow-hidden min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 justify-center">
        {/* Developer Image */}
        <div className="w-96 h-96 overflow-hidden p-2">
         <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id="blobClip">
            <path d="M127.14 200C99.9942 200 99.9943 167.423 72.8487 167.423C41.6048 167.423 0 158.386 0 127.133C0 99.9885 32.5678 99.9885 32.5678 72.8445C32.5678 41.6139 41.6048 0 72.8602 0C100.006 0 100.006 32.5774 127.151 32.5774C158.384 32.5774 200 41.6139 200 72.8675C200 100.012 167.421 100.012 167.421 127.156C167.409 158.444 158.384 200 127.14 200Z" />
          </clipPath>
        </defs>

        {/* Replace with your image path in the public folder */}
        <image
          href="/nikz.jpg"
          clipPath="url(#blobClip)"
          width="200"
          height="200"
          className="w-full h-full object-cover hover:grayscale-50 transition-all duration-300"
        />
      </svg>
</div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left max-w-xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Meet the Developer</h2>
          <p className="text-lg mb-4 text-muted-foreground">
            I&apos;m <span className="font-semibold text-sky-400">Nikson</span>, a passionate Software Engineering student and the mind behind Dokunote.
            I love crafting intelligent tools that simplify your research and writing journey.
          </p>
          <p className="italic text-muted-foreground mb-6">&quot;Build what you wish existed.&quot;</p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-4">
            <a href="https://github.com/Hirusha-Nikson" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-2xl hover:text-sky-400 transition" />
            </a>
            <a href="https://www.linkedin.com/in/hirusha-nikson" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl hover:text-sky-400 transition" />
            </a>
            <a href="https://www.dokunoteweb@gmail.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="text-2xl hover:text-sky-400 transition" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
