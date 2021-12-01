import './Contact.css';
import './ContactInfo'
import Footer from '../Footer/Footer';
import Layout from '../Layout/Layout';
import ContactInfo from './ContactInfo';
import { useState } from 'react';


export default function Contact() {
  const [isSubmitted, setIsSubmitted]= useState(false)
  function submitForm() {
    setIsSubmitted(true)
   }

  return (
  <> 
    <div>
      <ContactInfo submitForm={submitForm} />
    </div>
    <Layout/>
    <footer>
      <Footer/>
    </footer>
    </>
  );
}
