import Section from "../components/Section";
import { profile } from "../data";
export default function Contact() {
    return (
        <Section id="contact" title="Contact">
            <div className="space-y-2 text-gray-200">
                <div>Location: <a className="underline" href={`https://maps.app.goo.gl/fzGmUcjpDZtsVkXE8`}>{profile.address}</a></div>
                <div>Phone: <a className="underline" href={`tel:${profile.phone.replace(/\\s+/g, "")}`}>{profile.phone}</a></div>
                <div>Email: <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a></div>
                <div>GitHub: <a className="underline" href={`https://github.com/${profile.github}`} target="_blank">{profile.github}</a></div>
                <div>LinkedIn: <a className="underline" href={`https://www.linkedin.com/in/${profile.linkedin}`} target="_blank">{profile.linkedin}</a></div>
            </div>
        </Section>
    );
}