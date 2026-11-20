import './Contact.css';
import PhoneInputModule from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import fr from 'react-phone-input-2/lang/fr.json';
import { useContact } from "./useContact";
import { useTranslation } from 'react-i18next';
import validate from './validateInfo';

const PhoneInput = PhoneInputModule.default || PhoneInputModule;

export default function ContactInfo({ submitForm }) {
  const { t, i18n } = useTranslation();

  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    isSubmitting,
    submitStatus
  } = useContact(submitForm, validate);

  const isFrench = i18n.language.startsWith('fr');

  return (
    <div className="contact-container">
      <form className="contact_Form" onSubmit={handleSubmit}>

        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          className="form-input"
          placeholder="E-mail"
          minLength="5"
          maxLength="50"
          autoComplete="off"
        />
        {errors.email && (
          <p className="errorMsg">{errors.email}</p>
        )}

        <input
          name="emailConf"
          id="emailConf"
          type="email"
          value={values.emailConf}
          onChange={handleChange}
          className="form-input"
          minLength="5"
          maxLength="50"
          autoComplete="off"
          placeholder={t('confirm_email')}
        />
        {errors.emailConf && (
          <p className="errorMsg">{errors.emailConf}</p>
        )}

        <input
          name="userName"
          id="userName"
          value={values.userName}
          onChange={handleChange}
          className="form-input"
          maxLength="50"
          autoComplete="off"
          placeholder={t('name')}
        />

        <PhoneInput
          country="fr"
          localization={isFrench ? fr : undefined}
          key={isFrench ? 'fr' : 'en'}
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
            isFrench
              ? 'Rechercher un pays...'
              : 'Search country...'
          }
          inputProps={{
            name: 'phone',
            id: 'phone',
            autoComplete: 'tel'
          }}
          inputClass="phone-number-input"
        />

        <textarea
          className="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          maxLength="500"
          placeholder={t('message')}
        />

        <button
          className="submit-Btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? (isFrench ? 'Envoi en cours...' : 'Sending...')
            : t('send')}
        </button>

        {submitStatus === 'success' && (
          <p
            role="status"
            aria-live="polite"
            style={{
              color: '#4ade80',
              textAlign: 'center',
              marginTop: '20px',
              fontWeight: 'bold'
            }}
          >
            {isFrench
              ? 'Votre message a bien été envoyé !'
              : 'Your message has been sent successfully!'}
          </p>
        )}

        {submitStatus === 'error' && (
          <p
            role="alert"
            style={{
              color: '#ff6b6b',
              textAlign: 'center',
              marginTop: '20px',
              fontWeight: 'bold'
            }}
          >
            {isFrench
              ? "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
              : 'An error occurred while sending your message. Please try again.'}
          </p>
        )}

      </form>
    </div>
  );
}
