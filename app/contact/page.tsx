import Container from "@/components/Common/Container";
import { personalInfo } from "@/constant/fixedText";

const ContactPage = () => {
  return (
    <Container title="Contact Info's">
      {/* Phone number */}
      <div className="gap-5 space-y-3 text-red-400">
        <span className="flex items-center gap-2 text-lg">
          <h2 className="w-fit rounded border border-solid border-white border-opacity-75 px-2 font-bold">
            Phone number
          </h2>
          {personalInfo.number}
        </span>
        {/* Email */}
        <span className="flex items-center gap-2 text-lg">
          <h2 className="w-fit rounded border border-solid border-white border-opacity-75 px-2 font-bold">
            Email
          </h2>
          {personalInfo.email}
        </span>
        {/* Fb link */}
        <span className="flex items-center gap-2 text-lg">
          <h2 className="w-fit rounded border border-solid border-white border-opacity-75 px-2 font-bold">
            Facebook
          </h2>
          <a
            className="text-lg"
            href="https://www.facebook.com/profile.php?id=61555538766811"
            target="_blank"
          >
            Click Me
          </a>
        </span>
      </div>
      <div className="w-full pt-5">
        <h2 className="text-xl font-bold uppercase tracking-wider">
          Let's get in touch
        </h2>
      </div>
    </Container>
  );
};

export default ContactPage;
