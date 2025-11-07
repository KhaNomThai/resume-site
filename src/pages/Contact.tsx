import { motion } from "framer-motion";
import Page from "../components/Page";
import Section, { container, item } from "../components/Section";
import { profile } from "../data";

export default function Contact() {
  return (
    <Page>
      <Section id="contact" title="Contact">
        <motion.ul
          className="space-y-3 text-gray-200"
          variants={container(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Location */}
          {profile.address && (
            <motion.li variants={item(8)}>
              Location:{" "}
              <a
                className="underline"
                href="https://maps.app.goo.gl/fzGmUcjpDZtsVkXE8"
                target="_blank"
                rel="noreferrer"
              >
                {profile.address}
              </a>
            </motion.li>
          )}

          {/* Phone */}
          {profile.phone && (
            <motion.li variants={item(8)}>
              Phone:{" "}
              <a
                className="underline"
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              >
                {profile.phone}
              </a>
            </motion.li>
          )}

          {/* Email */}
          <motion.li variants={item(8)}>
            Email:{" "}
            <a className="underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </motion.li>

          {/* GitHub */}
          <motion.li variants={item(8)}>
            GitHub:{" "}
            <a
              className="underline"
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noreferrer"
            >
              {profile.github}
            </a>
          </motion.li>

          {/* LinkedIn */}
          <motion.li variants={item(8)}>
            LinkedIn:{" "}
            <a
              className="underline"
              href={`https://www.linkedin.com/in/${profile.linkedin}`}
              target="_blank"
              rel="noreferrer"
            >
              {profile.linkedin}
            </a>
          </motion.li>
        </motion.ul>
      </Section>
    </Page>
  );
}
