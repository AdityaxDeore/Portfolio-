import axios from "axios";

const $token = "992156607:AAGUXoR5gG_OzNVc7e-XcP2ctBw-KohkfHM";
// const $token = "5877035721:AAFpZ0dtVI_61Iz6OuFFld4PZLq0IOr4DR0";
const $chat_id = "-1001177733304";
const $our_chat_id = "-1001343507692";
// const $our_chat_id = "5650627757";
const $arr = {
    name: "Имя",
    email: "Email",
    interest: "Заинтересован в",
    budget: "Бюджет (USD)",
    message: "Сообщение",
    referral: "Реферал",
};

export const sendForm = (formData, onSuccess, onError) => {
    let text = Object.keys(formData)
        .map((key) => {
            if (typeof formData[key] === "object") {
                return `<b>${[$arr[key]]}</b>: ${formData[key].reduce(
                    (acc, val) => (acc ? `${acc}, ${val}` : val),
                    ""
                )}`;
            }
            return `<b>${[$arr[key]]}</b>: ${(formData[key] || '').replace(/[<&#$^]/gi, '')}`;
        })
        .reduce((acc, val) => (acc ? `${acc}%0A${val}` : val), "<b>Запрос с сайта[QCLAY]</b>").replace(/[&#$^]/g, '');

    // const ref = window.location.search
    //     .split("?")
    //     .find((item) => item.includes("ref="))
    //     ?.slice(4);
    // text += ref ? `%0A<b>Реферал:</b> ${ref}` : "";

    const url = `https://api.telegram.org/bot${$token}/sendMessage?chat_id=${$our_chat_id}&parse_mode=html&text=${text}&disable_web_page_preview=true`;

    console.log(text);
    axios
        .post(url, {})
        .then(function(response) {
            onSuccess && onSuccess(response);
        })
        .catch(function(error) {
            onError && onError(error);
        });
};