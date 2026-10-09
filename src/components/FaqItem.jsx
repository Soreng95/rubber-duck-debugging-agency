import { useState, useId } from "react";
import "./FaqItem.css";


export default function FaqItem ({item}) {
    const [isOpen, setIsOpen] = useState(false);
    const id = useId();
    const buttonId = `${id}-button`;
    const panelId = `${id}-panel`

    return (
        <div className="faq_item">
            <button type="button" id={buttonId} className="faq_question" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setIsOpen((open) => !open)}>
                <span className="faq_question_text">
                    <span className="faq_q-no"> {item.question} </span>
                    <span className="faq_q-en"> {item.questionEn} </span>
                </span>
                <span className="faq_icon" aria-hidden="true"> {isOpen ? "-" : "+"} </span>
            </button>
                <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`faq_answer ${isOpen ? "is-open" : ""}`}
      >
        <div className="faq_answer-inner">
          <p>{item.answer}</p>
          <p>{item.answerEn}</p>
        </div>
        <div
  id={panelId}
  role="region"
  aria-labelledby={buttonId}
  className={`faq_answer ${isOpen ? "is-open" : ""}`}
  inert={!isOpen}
></div>
      </div>
        </div>
        
    );

}