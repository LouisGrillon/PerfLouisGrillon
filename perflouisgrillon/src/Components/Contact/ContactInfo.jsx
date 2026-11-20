import './Contact.css';
import PhoneInputModule from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useContact } from "./useContact";
import { useTranslation } from 'react-i18next';

import validate from './validateInfo';

const PhoneInput = PhoneInputModule.default || PhoneInputModule;

export default function ContactInfo({submitForm}) {

    const { t, i18n } = useTranslation()
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

          <PhoneInput
          country="fr"
    value={values.phone || ''}
  onChange={(phone) =>
    handleChange({
      target: {
        name: 'phone',
        value: phone
      }
    })
  }
  enableSearch={true}
  searchPlaceholder={
    i18n.language.startsWith('fr')
      ? 'Rechercher un pays...'
      : 'Search country...'
  }
  inputProps={{
    name: 'phone',
    id: 'phone',
    autoComplete: 'tel'
  }}
  inputClass="form-input"
/>

          
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
