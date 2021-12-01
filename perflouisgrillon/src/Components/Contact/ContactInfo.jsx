import './Contact.css';
import { useContact } from "./useContact";
import { useTranslation } from 'react-i18next';

import validate from './validateInfo';

export default function ContactInfo({submitForm}) {

    const { t } = useTranslation()
    const {handleChange, values, handleSubmit, errors}
    = useContact(
        submitForm,
        validate
    )
   
  return (<> 
    <div className="contact-container">

      

        <form className="contact_Form" onSubmit={handleSubmit} >
    
          <input 
          id="email" 
          name="email" 
          type="email" 
          value={values.email}
          onChange={handleChange}
          className="form-input" 
          placeholder="E-mail"  
          minLength= '5' 
          maxLength ='50' 
          autoComplete="off"/>
         {errors.email && <p classname="errorMsg"> {errors.email} </p>}
         
          <input 
          name="emailConf" 
          id="emailConf" 
          type="email" 
          value={values.emailConf}
          onChange={handleChange}
          className="form-input" 
          minLength= '5' 
          maxLength='50' 
          autoComplete="off"
          placeholder={t('confirm_email')}/>
         {errors.emailConf && <p classname="errorMsg"> {errors.emailConf} </p>}

          
          <input 
          name="userName" 
          id="userName"
          value={values.userName}
          onChange={handleChange} 
          className="form-input" 
          maxLength='50' 
          autoComplete="off"
          placeholder={t('name')}/>

          <input 
          name="phone" 
          id="phone" 
          type="tel"
          value={values.phone}
          onChange={handleChange}
          className="form-input"
          maxLength='10' 
          autoComplete="off"
          placeholder={t('phone')}/>

          
          <textarea 
          className="message" 
          name="message" 
          maxLength='500' 
          placeholder={t('message')} />
          
          <button className="submit-Btn" type="submit">
          {t('send')}
          </button>

        </form>

      
    
    </div>
    </>
  );
}