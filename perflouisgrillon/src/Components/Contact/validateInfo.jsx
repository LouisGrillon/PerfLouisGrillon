export default function validateInfo(values) {
    let errors ={};

    //email
    if(!values.email) {  
        errors.email= "Entrez votre e-mail";
    } else if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email= "Entrez votre e-mail"
    }

    //email confirm
    if (!values.emailConf){
        errors.emailConf= "Entrez votre e-mail";
    } else if (values.emailConf !== values.email){
        errors.emailConf = "Les emails ne correspondent pas"
    }

    //phone
    // if (!/^\d{10}$/.test(values.phone)){
    //     errors.phone= "Entrez un numéro valide"
    // }

    return errors;
}
