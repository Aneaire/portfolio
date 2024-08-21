import Container from "@/components/Common/Container";
import EmailForm from "@/components/contact/emailForm";
import { Separator } from "@/components/ui/separator";
import { personalInfo } from "@/constant/fixedText";

const ContactPage = () => {
  return (
    <Container title="Contact Info's">
      {/* Phone number */}
      <div className="text-red-00 gap-5 space-y-3">
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
          <a href="mailto:aneaire010@gmail.com">{personalInfo.email}</a>
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
      <div className="w-full max-w-3xl pt-5">
        <Separator orientation="horizontal" className="mb-5" />
        <h2 className="text-3xl font-medium uppercase tracking-wider">
          Let's get in touch
        </h2>
        <p className="py-2 text-lg leading-6">
          Ready to bring your web or mobile app idea to life? I'm here to help.
          Reach out, and let's create something great together!
        </p>
        <div className="w-full">
          <EmailForm />
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
