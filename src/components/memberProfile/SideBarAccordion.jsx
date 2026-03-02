import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import "../../styles/Committee.css";

const committeeData = [
  {
    title: "Advisory committee",
    items: [
      "Library Advisory committee",
      "Legislature Museum Advisory Committee",
      "Subject committee -v(Public works,transport and communication)",
    ],
  },
  {
    title: "Business Committee",
    items: [
      "Business Rules Review Committee",
      "Parliamentary Privileges Committee",
      "Members Amenities Committee",
    ],
  },
  {
    title: "Others",
    items: [
      "Ethics Committee",
      "Rules Committee",
      "Question & Reference Committee",
    ],
  },
  {
    title: "Subject committees",
    items: [
      "Industries Committee",
      "Health and Family Welfare Committee",
      "Education Committee",
    ],
  },
  {
    title: "Financial committees",
    items: [
      "Estimates Committee",
      "Public Accounts Committee",
      "Public Undertakings Committee",
    ],
  },
  {
    title: "Welfare committees",
    items: [
      "SC/ST Welfare Committee",
      "Women & Children Welfare Committee",
      "Minority Welfare Committee",
    ],
  },
  {
    title: "Adhoc committees",
    items: [
      "Cyber Safety Committee",
      "Flood Management Committee",
      "COVID-19 Response Committee",
    ],
  },
  {
    title: "Select committees",
    items: [
      "Select Committee on Bill A",
      "Select Committee on Bill B",
      "Select Committee on Bill C",
    ],
  },
  {
    title: "Expert committees",
    items: [
      "Energy Experts Committee",
      "Agriculture Advisory Panel",
      "Tech & AI Committee",
    ],
  },
];

const SidebarAccordion = () => {
  return (
    <div className="list-sidebar-style1 committi position-relative">
      <div className="form-style1 mb30">
        <select className="selectpicker">
          <option>15th</option>
          <option>14th</option>
          <option>13th</option>
          <option>12th</option>
          <option>11th</option>
          <option>10th</option>
          <option>9th</option>
        </select>
      </div>

      <Accordion.Root
        type="multiple"
        className="accordion"
        id="accordionExample"
      >
        {committeeData.map((committee, idx) => (
          <Accordion.Item key={idx} value={`item-${idx}`} className="card mt-0">
            <Accordion.Header className="card-header" id={`heading${idx}`}>
              <h6>
                <Accordion.Trigger
                  className="btn btn-link ps-0 pt-0 d-flex justify-between w-100"
                  aria-controls={`collapse${idx}`}
                >
                  {committee.title}
                  <ChevronDownIcon />
                </Accordion.Trigger>
              </h6>
            </Accordion.Header>
            <Accordion.Content
              className="collapse show"
              id={`collapse${idx}`}
              aria-labelledby={`heading${idx}`}
              data-parent="#accordionExample"
            >
              <div className="sublinkz">
                <ul>
                  {committee.items.map((item, i) => (
                    <li key={i}>
                      <a href="#" id="sample1">
                        <img src="images/right-arro.png" width={12} alt="" />
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default SidebarAccordion;
