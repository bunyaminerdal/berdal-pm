import { CardWrapper } from '@/components/auth/card-wrapper';
import ContactForm from '@/components/contact-me/ContactForm';
import UpperSection from '@/components/contact-me/UpperSection';

const ContactMePage = () => {
  return (
    <CardWrapper headerTitle='Contact Me' headerLabel={<UpperSection />}>
      <ContactForm />
    </CardWrapper>
  );
};

export default ContactMePage;
