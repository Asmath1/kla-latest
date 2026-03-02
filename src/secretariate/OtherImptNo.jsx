import React, { useEffect, useState } from "react";
import {
  BreadcrumbNav,
  CategoriesNav,
  SectionTitle,
  Tabs,
} from "../components/common";
import HomeTest from "../components/Header";
import VerticalTabs from "../components/common/VerticalTabs"; // ← ADD THIS IMPORT

export const CanteenDetails = () => {
  return (
    <div>
      <h4>Canteen</h4>
      <Tabs
        tabs={[
          {
            key: "indian-coffee-house",
            label: "Indian Coffee House",
            content: <CanteenList />,
          },

          {
            key: "Non-Vegetarian",
            label: "Non-vegetarian",
            content: <CanteenNonVeg />,
          },

          {
            key: "Vegetarian",
            label: "Vegetarian",
            content: <div className="container mt-4"></div>,
          },
        ]}
        onChange={() => {}}
      />
    </div>
  );
};

export const CanteenList = () => {
  const canteenData = [
    {
      id: 1,
      name: "Canteen (Coffee House)",
      location: "Ground Floor, Assembly Building",
      phone: "2030",
    },
    {
      id: 2,
      name: "Canteen (Members)",
      location: "I Floor, Assembly Building",
      phone: "2051",
    },
    {
      id: 3,
      name: "Canteen (Administrative Building)",
      location: "A Block, I Floor",
      phone: "2538",
    },
    {
      id: 4,
      name: "Canteen - Non-Vegetarian (MLA Hostel)",
      location: "Ground Floor, Nila Block",
      phone: "2266",
    },
    {
      id: 5,
      name: "Canteen - Vegetarian (MLA Hostel)",
      location: "I Floor, Pamba Block",
      phone: "2265",
    },
  ];

  return (
    <div className="tabley mt20">
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Canteen Name</th>
            <th scope="col">Location</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {canteenData.map((item) => (
            <tr key={item.id} className="debate">
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const CanteenNonVeg = () => {
  return (
    <div className="tabley mt20">
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Canteen Name</th>
            <th scope="col">Location</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>

        <tbody>
          <tr className="debate">
            <td>1</td>
            <td>Canteen - Non-Vegetarian (MLA Hostel)</td>
            <td>Ground Floor, Nila Block</td>
            <td>2266</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export const ClinicsTable = () => {
  const clinics = [
    {
      id: 1,
      name: "Ayurveda",
      phone: "2227",
      location: "Ist Floor, Nila Block, MLA hostel",
    },
    {
      id: 2,
      name: "Dental",
      phone: "2293",
      location: "Ist Floor, Nila Block, MLA hostel",
    },
    {
      id: 3,
      name: "Eye Clinic",
      phone: "2659",
      location: "Ist Floor, Nila Block, MLA hostel",
    },
    {
      id: 4,
      name: "Health Clinic Doctor",
      phone: "2216",
      location: "Ist Floor, Nila Block, MLA hostel",
    },
    {
      id: 5,
      name: "Health Clinic",
      phone: "2215",
      location: "Ist Floor, Nila Block, MLA hostel",
    },
    {
      id: 6,
      name: "Health Clinic Lab",
      phone: "2309",
      location: "Ist Floor, Nila Block, MLA hostel",
    },
    {
      id: 7,
      name: "Homoeo",
      phone: "2352",
      location: "Ist Floor, Nila Block, MLA hostel",
    },
  ];

  return (
    <div className="tabley mt20">
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Clinics</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Location</th>
          </tr>
        </thead>

        <tbody>
          {clinics.map((item) => (
            <tr key={item.id} className="debate">
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Clinics = () => {
  return (
    <div>
      <h4>Clinics</h4>
      <Tabs
        tabs={[
          {
            //
            key: "Ayurveda",
            label: "Ayurveda",
            content: <ClinicsTable />,
          },

          {
            key: "Dental",
            label: "Dental",
            content: <CanteenNonVeg />,
          },

          {
            key: "HealthClinic",
            label: "Health Clinic",
            content: <CanteenNonVeg />,
          },

          {
            key: "Homoeo",
            label: "Homoeo",
            content: <CanteenNonVeg />,
          },

          {
            key: "Health - Ophthalmology",
            label: "Health - Ophthalmology",
            content: <CanteenNonVeg />,
          },
          {
            key: " Health Clinic Lab",
            label: " Health Clinic Lab",
            content: <CanteenNonVeg />,
          },
        ]}
        onChange={() => {}}
      />{" "}
    </div>
  );
};

export const KeyRoom = () => {
  return (
    <div className="tabley mt20">
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Canteen Name</th>
            <th scope="col">Location</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>

        <tbody>
          <tr className="debate">
            <td>1</td>
            <td>Room No. 414</td>
            <td>Ground Floor, Assembly Building</td>
            <td>2171</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export const Reception = () => {
  return (
    <div className="tabley mt20">
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Name / Designation</th>
            <th scope="col">Location / Details</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>

        <tbody>
          {/* MAIN RECEPTION NUMBER */}
          <tr className="debate">
            <td>1</td>
            <td>Reception</td>
            <td>Reception Centre, Legislature Complex</td>
            <td>2028</td>
          </tr>

          {/* SMT. BINDU S.L. */}
          <tr className="debate">
            <td>2</td>
            <td>
              SMT. BINDU S.L.
              <br />
              Under Secretary
              <br />
              Press Relations & Reception
            </td>
            <td>
              Room No. 422, Ground Floor, Assembly Building
              <br />
              Email: slbinduraj@gmail.com
            </td>
            <td>2635</td>
          </tr>

          {/* SHRI MATHEW A.G. */}
          <tr className="debate">
            <td>3</td>
            <td>
              SHRI MATHEW A.G.
              <br />
              Section Officer
            </td>
            <td>Reception Section</td>
            <td>2028</td>
          </tr>

          {/* YOUR ORIGINAL SAMPLE ROW (OPTIONAL – KEEP IF YOU WANT) */}
          <tr className="debate">
            <td>4</td>
            <td>Room No. 414</td>
            <td>Ground Floor, Assembly Building</td>
            <td>2171</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const SecurityFrisking = () => {
  return (
    <div className="tabley mt20">
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Name / Designation</th>
            <th scope="col">Location</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>

        <tbody>
          <tr className="debate">
            <td>1</td>
            <td>Security Frisking (Reception)</td>
            <td>Reception Centre, Legislature Complex</td>
            <td>2478</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const PWDTable = () => {
  const data = [
    {
      id: 1,
      name: "Smt. Jasmine T B, Executive Engineer, KLC Construction Division, PWD, Vikas Bhavan, Thiruvananthapuram",
      officePhone: "2512547",
      epabx: "2547",
      mobile: "9446277033 / 7594972128",
      email: "nithajasmin7@gmail.com",
      address:
        "Anugraha, Perumthottam, Mulluvila P O, Neyyattinkara, Thiruvananthapuram",
    },
    {
      id: 2,
      name: "Shri. Ajith Kumar, Assistant Executive Engineer, KLC Sub Division No. 1",
      officePhone: "2303307",
      epabx: "",
      mobile: "7594972130",
      email: "ajithponnara@gmail.com",
      address: "Sopanam, Kunnuvaram, Attingal, Thiruvanathapuram",
    },
    {
      id: 3,
      name: "Smt. Thushara V S, Assistant Engineer, KLC Section 2",
      officePhone: "",
      epabx: "2471",
      mobile: "8289886948 / 7594972132",
      email: "thusharasanthosh10@gmail.com",
      address:
        "Thushara Bhavan, Sajam House 25, Kudappanakkunnu, Thiruvanavthapuram",
    },
    {
      id: 4,
      name: "Smt. Shylin Rachel John, Assistant Engineer, KLC Section 3",
      officePhone: "",
      epabx: "2474",
      mobile: "9746470805 / 7594972133",
      email: "srj664@gmail.com",
      address:
        "Wins Dale, Christ Nagar, Vazhayila, Peroorkada P O, Thiruvananthapuram",
    },
    {
      id: 5,
      name: "KLC Sub Division Office No. 1",
      officePhone: "",
      epabx: "2602",
      mobile: "",
      email: "",
      address: "",
    },
  ];

  return (
    <div className="tabley mt20">
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Name & Designation</th>
            <th scope="col">Phone No</th>
            <th scope="col">Email / Residential Address</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr className="debate" key={item.id}>
              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>
                <strong>Office:</strong> {item.officePhone || "-"} <br />
                <strong>EPABX:</strong> {item.epabx || "-"} <br />
                <strong>Mobile:</strong> {item.mobile || "-"}
              </td>

              <td>
                <strong>Email:</strong> {item.email || "-"} <br />
                <strong>Address:</strong>{" "}
                <span style={{ whiteSpace: "pre-line" }}>
                  {item.address || "-"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const KLCTable2 = () => {
  const data = [
    {
      id: 1,
      name: "Shri. Satheesh Kumar A, Assistant Executive Engineer, Sub Division KLC",
      officePhone: "2303680",
      epabx: "2455",
      mobile: "8086395247",
      email: "esdnklctvm@gmail.com",
      address:
        "Neeranjanam, Rank E - Level, Sivaji Lane, Vattiyoorkavu, Thiruvananthapuram",
    },
    {
      id: 2,
      name: "Assistant Engineer KLC Section 1",
      officePhone: "2512540",
      epabx: "",
      mobile: "754975223",
      email: "",
      address: "",
    },
    {
      id: 3,
      name: "Assistant Engineer KLC Section 2",
      officePhone: "2512088",
      epabx: "",
      mobile: "754975224",
      email: "",
      address: "",
    },
    {
      id: 4,
      name: "Electrical Sub Division (Electrical)",
      officePhone: "",
      epabx: "2462",
      mobile: "",
      email: "",
      address: "",
    },
    {
      id: 5,
      name: "Plant Room (Electrical)",
      officePhone: "",
      epabx: "2540",
      mobile: "",
      email: "",
      address: "",
    },
    {
      id: 6,
      name: "Control Room (Electrical)",
      officePhone: "",
      epabx: "2003",
      mobile: "",
      email: "",
      address: "",
    },
  ];

  return (
    <div className="tabley mt20">
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Name & Designation</th>
            <th scope="col">Phone No</th>
            <th scope="col">Email / Residential Address</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr className="debate" key={item.id}>
              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>
                <strong>Office:</strong> {item.officePhone || "-"} <br />
                <strong>EPABX:</strong> {item.epabx || "-"} <br />
                <strong>Mobile:</strong> {item.mobile || "-"}
              </td>

              <td>
                <strong>Email:</strong> {item.email || "-"} <br />
                <strong>Address:</strong>{" "}
                <span style={{ whiteSpace: "pre-line" }}>
                  {item.address || "-"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const ElectronicsDivisionTable = () => {
  const data = [
    {
      id: 1,
      name: "Shri. Sanil Kumar S, Assistant Executive Engineer",
      officePhone: "",
      epabx: "3011",
      mobile: "9446024120",
      email: "sanilkumars@outlook.com",
      address: "",
    },
    {
      id: 2,
      name: "Shri. Arun Raj, Assistant Engineer 1",
      officePhone: "",
      epabx: "3012",
      mobile: "9895594069",
      email: "arunrajktr@gmail.com",
      address: "",
    },
    {
      id: 3,
      name: "Smt. Sareena R, Assistant Engineer 2",
      officePhone: "",
      epabx: "3010",
      mobile: "9446210366",
      email: "sarunsar@gmail.com",
      address: "",
    },
    {
      id: 4,
      name: "Shri. Prasanth R, Assistant Engineer 3",
      officePhone: "",
      epabx: "2473",
      mobile: "9961420465",
      email: "rprasanth8@gmail.com",
      address: "",
    },
    {
      id: 5,
      name: "Electronics Sub Division",
      officePhone: "",
      epabx: "2032",
      mobile: "",
      email: "",
      address: "",
    },
    {
      id: 6,
      name: "Electronics Control Room",
      officePhone: "",
      epabx: "2049",
      mobile: "",
      email: "",
      address: "",
    },
    {
      id: 7,
      name: "Telephone Exchange",
      officePhone: "",
      epabx: "3000",
      mobile: "",
      email: "",
      address: "",
    },
    {
      id: 8,
      name: "KLA",
      officePhone: "",
      epabx: "2000",
      mobile: "",
      email: "",
      address: "",
    },
  ];

  return (
    <div className="tabley mt20">
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Name & Designation</th>
            <th scope="col">Phone No</th>
            <th scope="col">Email / Residential Address</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr className="debate" key={item.id}>
              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>
                <strong>Office:</strong> {item.officePhone || "-"} <br />
                <strong>EPABX:</strong> {item.epabx || "-"} <br />
                <strong>Mobile:</strong> {item.mobile || "-"}
              </td>

              <td>
                <strong>Email:</strong> {item.email || "-"} <br />
                <strong>Address:</strong>{" "}
                <span style={{ whiteSpace: "pre-line" }}>
                  {item.address || "-"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const MechanicalDivisionTable = () => {
  const data = [
    {
      id: 1,
      name: "Shri. Vivek.S.Devan, Assistant Executive Engineer, PWD Mechanical Sub Division",
      officePhone: "",
      epabx: "2567",
      mobile: "9400892135",
      email: "aeemechklctvm@gmail.com",
      address: "Surabhi, Sivodayam Road, Vellayani, Thiruvananthapuram, 695020",
    },
    {
      id: 2,
      name: "Shri. Rajesh S, Assistant Engineer, PWD Mechanical Sub Division",
      officePhone: "",
      epabx: "2550",
      mobile: "9847052840",
      email: "mba9847052840@gmail.com",
      address:
        "Gokulam, Puthenvila Veedu, Kudavoor P.O, Vengode, Thiruvananthapuram, 695313",
    },
    {
      id: 3,
      name: "Plant Room (Mechanical)",
      officePhone: "",
      epabx: "2541",
      mobile: "",
      email: "",
      address: "",
    },
  ];

  return (
    <div className="tabley mt20">
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Name & Designation</th>
            <th scope="col">Phone No</th>
            <th scope="col">Email / Residential Address</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr className="debate" key={item.id}>
              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>
                <strong>Office:</strong> {item.officePhone || "-"} <br />
                <strong>EPABX:</strong> {item.epabx || "-"} <br />
                <strong>Mobile:</strong> {item.mobile || "-"}
              </td>

              <td>
                <strong>Email:</strong> {item.email || "-"} <br />
                <strong>Address:</strong>{" "}
                <span style={{ whiteSpace: "pre-line" }}>
                  {item.address || "-"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const PWD = () => {
  return (
    <div>
      <h4>PWD</h4>
      <Tabs
        tabs={[
          {
            key: "Civil",
            label: "Civil",
            content: <PWDTable />,
          },

          {
            key: "Electrical",
            label: "Electrical",
            content: <KLCTable2 />,
          },
          {
            key: "Electronics",
            label: "Electronics",
            content: <ElectronicsDivisionTable />,
          },
          {
            key: "Mechanical",
            label: "Mechanical",
            content: <MechanicalDivisionTable />,
          },
        ]}
        onChange={() => {}}
      />
    </div>
  );
};

export const Enquires = () => {
  const data = [
    {
      id: 1,
      name: "Assistant Manager, MLA Hostel",
      location: "Room No. xx, Nila Block, MLA Hostel",
      phone: "2261",
    },
  ];
  return (
    <div>
      <h4>Enquires</h4>
      <Tabs
        tabs={[
          {
            //    , MLA Hostel

            key: " Asst. Manager",
            label: " Asst. Manager, MLA Hostel",
            content: (
              <div className="tabley mt20">
                <table className="table table myTable2">
                  <thead>
                    <tr>
                      <th scope="col">Sl.No</th>
                      <th scope="col">Name / Designation</th>
                      <th scope="col">Location</th>
                      <th scope="col">Phone Number</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id} className="debate">
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.location}</td>
                        <td>{item.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          },

          {
            key: "Key Room ",
            label: "Key Room ",
            content: <KeyRoom />,
          },

          {
            key: "Reception",
            label: "Reception",
            content: <Reception />,
          },

          {
            key: "Speaker Gate",
            label: "Speaker Gate",
            content: <SecurityFrisking />,
          },
        ]}
        onChange={() => {}}
      />
    </div>
  );
};

export const Railway = () => {
  const data = [
    {
      id: 1,
      name: "Room No. 24, Nila Block, MLA Hostel",
      officePhone: "2392",
      epabx: "",
      mobile: "",
      email: "",
      address: "",
    },
  ];

  return (
    <div className="tabley">
      <h4>Railway</h4>
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Name / Location</th>
            <th scope="col">Phone No</th>
            <th scope="col">Email / Residential Address</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr className="debate" key={item.id}>
              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>
                <strong>Office:</strong> {item.officePhone || "-"} <br />
                <strong>EPABX:</strong> {item.epabx || "-"} <br />
                <strong>Mobile:</strong> {item.mobile || "-"}
              </td>

              <td>
                <strong>Email:</strong> {item.email || "-"} <br />
                <strong>Address:</strong>{" "}
                <span style={{ whiteSpace: "pre-line" }}>
                  {item.address || "-"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const SBIExtensionCounter = () => {
  const data = [
    {
      id: 1,
      name: "SBI Extension Counter",
      officePhone: "2539",
      epabx: "",
      mobile: "",
      email: "",
      address: "",
    },
  ];

  return (
    <div className="tabley">
      <h4>SBI Extension Counter</h4>
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Name / Location</th>
            <th scope="col">Phone No</th>
            <th scope="col">Email / Residential Address</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr className="debate" key={item.id}>
              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>
                <strong>Office:</strong> {item.officePhone || "-"} <br />
                <strong>EPABX:</strong> {item.epabx || "-"} <br />
                <strong>Mobile:</strong> {item.mobile || "-"}
              </td>

              <td>
                <strong>Email:</strong> {item.email || "-"} <br />
                <strong>Address:</strong>{" "}
                <span style={{ whiteSpace: "pre-line" }}>
                  {item.address || "-"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const StaffCoopSocietyCounter = () => {
  const data = [
    {
      id: 1,
      name: "Staff Co-operative Society Extension Counter",
      officePhone: "2463",
      epabx: "",
      mobile: "",
      email: "",
      address: "",
    },
  ];

  return (
    <div className="tabley">
      <h4>Staff Coop Society Counter</h4>
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Name / Location</th>
            <th scope="col">Phone No</th>
            <th scope="col">Email / Residential Address</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr className="debate" key={item.id}>
              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>
                <strong>Office:</strong> {item.officePhone || "-"} <br />
                <strong>EPABX:</strong> {item.epabx || "-"} <br />
                <strong>Mobile:</strong> {item.mobile || "-"}
              </td>

              <td>
                <strong>Email:</strong> {item.email || "-"} <br />
                <strong>Address:</strong>{" "}
                <span style={{ whiteSpace: "pre-line" }}>
                  {item.address || "-"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const StaffHousingCoopSocietyCounter = () => {
  const data = [
    {
      id: 1,
      name: "Staff Housing Co-operative Society Extension Counter",
      officePhone: "2583",
      epabx: "",
      mobile: "",
      email: "",
      address: "",
    },
  ];

  return (
    <div className="tabley ">
      <h4>Staff Housing Co-operative Society</h4>
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Name / Location</th>
            <th scope="col">Phone No</th>
            <th scope="col">Email / Residential Address</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr className="debate" key={item.id}>
              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>
                <strong>Office:</strong> {item.officePhone || "-"} <br />
                <strong>EPABX:</strong> {item.epabx || "-"} <br />
                <strong>Mobile:</strong> {item.mobile || "-"}
              </td>

              <td>
                <strong>Email:</strong> {item.email || "-"} <br />
                <strong>Address:</strong>{" "}
                <span style={{ whiteSpace: "pre-line" }}>
                  {item.address || "-"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const TelephoneExchange = () => {
  const data = [
    {
      id: 1,
      name: "Telephone Exchange, Niyamasabha Complex",
      officePhone: "3000",
      epabx: "2000",
      mobile: "",
      email: "",
      address: "",
    },
  ];

  return (
    <div className="tabley">
      <h4>Telephone Exchange</h4>
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Name / Location</th>
            <th scope="col">Phone No</th>
            <th scope="col">Email / Residential Address</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr className="debate" key={item.id}>
              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>
                <strong>Office:</strong> {item.officePhone || "-"} <br />
                <strong>EPABX:</strong> {item.epabx || "-"} <br />
                <strong>Mobile:</strong> {item.mobile || "-"}
              </td>

              <td>
                <strong>Email:</strong> {item.email || "-"} <br />
                <strong>Address:</strong>{" "}
                <span style={{ whiteSpace: "pre-line" }}>
                  {item.address || "-"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const SubTreasury = () => {
  const data = [
    {
      id: 1,
      name: "Sub Treasury (B Block, Ground Floor, Administrative Building)",
      officePhone: "2556, 2557",
      epabx: "",
      mobile: "",
      email: "",
      address: "",
    },
    {
      id: 2,
      name: "Sub Treasury Officer",
      officePhone: "2518801",
      epabx: "",
      mobile: "",
      email: "",
      address: "",
    },
  ];

  return (
    <div className="tabley">
      <h4>SubTreasury</h4>
      <table className="table table myTable2">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Name / Designation</th>
            <th scope="col">Phone No</th>
            <th scope="col">Email / Residential Address</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr className="debate" key={item.id}>
              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>
                <strong>Office:</strong> {item.officePhone || "-"} <br />
                <strong>EPABX:</strong> {item.epabx || "-"} <br />
                <strong>Mobile:</strong> {item.mobile || "-"}
              </td>

              <td>
                <strong>Email:</strong> {item.email || "-"} <br />
                <strong>Address:</strong>{" "}
                <span style={{ whiteSpace: "pre-line" }}>
                  {item.address || "-"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Sisunikethan = () => {
  return (
    <div>
      <h4>Digital Garden</h4>
      <Tabs
        tabs={[
          {
            key: "Herbs",
            label: "Herbs",
            content: <p>Add data</p>,
          },

          {
            key: "Shrubs",
            label: "Shrubs",
            content: <p>Add data</p>,
          },
          {
            key: "Trees",
            label: "Trees",
            content: <p>Add data</p>,
          },
          {
            key: "Climbers",
            label: "Climbers",
            content: <p>Add data</p>,
          },
          {
            key: "Creepers",
            label: "Creepers",
            content: <p>Add data</p>,
          },
        ]}
        onChange={() => {}}
      />
    </div>
  );
};

const OtherImptNo = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --------------------------------------------------
  // LEFT MENU DATA: Deputed Staffs
  // --------------------------------------------------
  const deputedMenu = [
    {
      key: "deputed",
      label: "Deputed Staffs",
      children: [
        { key: "agri", label: "Agriculture" },
        { key: "fire", label: "Fire & Safety" },
        { key: "health", label: "Health" },
        { key: "pa", label: "PA to MLA" },
        { key: "ward", label: "Watch and Ward" },
      ],
    },
  ];

  const HealthContent = () => {
    return (
      <div className="health-section">
        <h4>Health</h4>
        <p>
          <strong>Health Inspector</strong>
          <br />
          (Room No. 402, D Block, III Floor, Administrative Building)
          <br />
          <strong>Phone :</strong> 2513
        </p>
        <div>
          <ClinicsContent />
        </div>
      </div>
    );
  };
  // const ClinicsContent = () => {
  //   const clinics = [
  //     {
  //       clinic: "Ayurveda",
  //       phone: "2227",
  //       location: "Ist Floor, Nila Block, MLA hostel",
  //     },
  //     {
  //       clinic: "Dental",
  //       phone: "2293",
  //       location: "Ist Floor, Nila Block, MLA hostel",
  //     },
  //     {
  //       clinic: "Eye Clinic",
  //       phone: "2659",
  //       location: "Ist Floor, Nila Block, MLA hostel",
  //     },
  //     {
  //       clinic: "Health Clinic Doctor",
  //       phone: "2216",
  //       location: "Ist Floor, Nila Block, MLA hostel",
  //     },
  //     {
  //       clinic: "Health Clinic",
  //       phone: "2215",
  //       location: "Ist Floor, Nila Block, MLA hostel",
  //     },
  //     {
  //       clinic: "Health Clinic Lab",
  //       phone: "2309",
  //       location: "Ist Floor, Nila Block, MLA hostel",
  //     },
  //     {
  //       clinic: "Homoeo",
  //       phone: "2352",
  //       location: "Ist Floor, Nila Block, MLA hostel",
  //     },
  //   ];

  //   return (
  //     <div className="clinics-section mt-3">
  //       <h5>Clinics</h5>

  //       <div className="table-responsive">
  //         <table className="table table-bordered table-striped">
  //           <thead>
  //             <tr>
  //               <th>Clinics</th>
  //               <th>Phone Number</th>
  //               <th>Location</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {clinics.map((row, idx) => (
  //               <tr key={idx}>
  //                 <td>{row.clinic}</td>
  //                 <td>{row.phone}</td>
  //                 <td>{row.location}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   );
  // };

  const ClinicsContent = () => {
    const clinics = [
      {
        clinic: "Ayurveda",
        phone: "2227",
        location: "Ist Floor, Nila Block, MLA hostel",
      },
      {
        clinic: "Dental",
        phone: "2293",
        location: "Ist Floor, Nila Block, MLA hostel",
      },
      {
        clinic: "Eye Clinic",
        phone: "2659",
        location: "Ist Floor, Nila Block, MLA hostel",
      },
      {
        clinic: "Health Clinic Doctor",
        phone: "2216",
        location: "Ist Floor, Nila Block, MLA hostel",
      },
      {
        clinic: "Health Clinic",
        phone: "2215",
        location: "Ist Floor, Nila Block, MLA hostel",
      },
      {
        clinic: "Health Clinic Lab",
        phone: "2309",
        location: "Ist Floor, Nila Block, MLA hostel",
      },
      {
        clinic: "Homoeo",
        phone: "2352",
        location: "Ist Floor, Nila Block, MLA hostel",
      },
    ];

    return (
      <div className="tabley mt20">
        <table className="table table myTable2">
          <thead>
            <tr>
              <th scope="col">Sl.No</th>
              <th scope="col">Clinic</th>
              <th scope="col">Phone</th>
              <th scope="col">Location</th>
            </tr>
          </thead>

          <tbody>
            {clinics.map((row, index) => (
              <tr className="debate" key={index}>
                <td>{index + 1}</td>
                <td>{row.clinic}</td>
                <td>{row.phone}</td>
                <td>{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const PAToMLAs = () => {
    const paList = [
      { mla: "Abdul Hameed P.", pa: "Abhilash J. R.", phone: "9895033009" },
      { mla: "Abid Hussain Thangal", pa: "Sudheer A.", phone: "7012699451" },
      { mla: "N.K. Akbar", pa: "Sajeev P.", phone: "9947931070" },
      { mla: "Manjalamkuzhi Ali", pa: "Pramod P.", phone: "9447332272" },
      { mla: "O.S. Ambika", pa: "Vinuraj D. R.", phone: "9446180801" },
      {
        mla: "A. P. Anil Kumar",
        pa: "Abdul Azeez Cheeranthodi",
        phone: "9745503696",
      },
      { mla: "Anoop Jacob", pa: "Shaju M", phone: "8547480492" },
      { mla: "K. Ansalan", pa: "", phone: "" },
      { mla: "Antony John", pa: "", phone: "" },
      { mla: "P. V. Anvar", pa: "Junaise", phone: "8075360920" },
      { mla: "Anwar Sadath", pa: "Saji S", phone: "9744145600" },
      { mla: "M. S. Arun Kumar", pa: "Sanjai Nath S.", phone: "8281682827" },
      { mla: "C. K. Asha", pa: "Sumod S P", phone: "9447131143" },
      { mla: "A.K.M. Ashraf", pa: "Asaraf K.", phone: "9895284600" },
      {
        mla: "K. Babu (Nenmara)",
        pa: "Ananthakrishnan B.",
        phone: "9447202377",
      },
      {
        mla: "K.Babu (Thrippunithura)",
        pa: "Anil Kumar P.",
        phone: "9447694861",
      },
      { mla: "P. Balachandran", pa: "Dhanush P.", phone: "9745314589" },
      { mla: "P. K. Basheer", pa: "Iqbal P. A.", phone: "9895029442" },
      { mla: "I. C. Balakrishnan", pa: "Shaji V. K.", phone: "9656565842" },
      { mla: "E. Chandrashekharan", pa: "K. Padmanabhan", phone: "9496831967" },
      {
        mla: "P. P. Chitharanjan",
        pa: "Deepu Krishnan K.",
        phone: "9746085534",
      },
      { mla: "Daleema", pa: "Muhammed Sha", phone: "9446553749" },
      { mla: "Eldose P. Kunnappillil", pa: "Damian Paul", phone: "9447218594" },
      { mla: "K. B. Ganesh Kumar", pa: "Sarath Kumar S.", phone: "9995109310" },
      { mla: "M. V. Govindan Master", pa: "Shagil", phone: "8547526406" },
      { mla: "C. K. Hareendran", pa: "", phone: "" },
      { mla: "T. V. Ibrahim", pa: "Azad P. V.", phone: "9447203001" },
      { mla: "K.T Jaleel", pa: "Manzoor P.", phone: "7907863232" },
      { mla: "Kanathil Jameela", pa: "Shaju N", phone: "9846700678" },
      { mla: "G. S. Jayalal", pa: "G. Vijayan", phone: "9947451911" },
      { mla: "K.U. Jenish Kumar", pa: "Jageesh M. N.", phone: "9496732797" },
      { mla: "Job Maichil", pa: "Rajesh R. N.", phone: "9447713045" },
      { mla: "P. J. Joseph", pa: "Nataraj V. A.", phone: "8606188877" },
      { mla: "V. Joy", pa: "V. Madanakumar", phone: "8086785959" },
      { mla: "O. R. Kelu", pa: "Rajesh M.", phone: "8281409730" },
      {
        mla: "P. K. Kunhalikutty",
        pa: "Ubaidulla Nanathu",
        phone: "9847892105",
      },
      {
        mla: "K.P. Kunhammed Kutti Master",
        pa: "Vipin K M",
        phone: "8157881878",
      },
      { mla: "C.H. Kunhambu", pa: "N. V. Padmanabhan", phone: "9895064232" },
      { mla: "Kovoor Kunjumon", pa: "Ushas John", phone: "9961017640" },
      { mla: "U.A. Lathif", pa: "A. Nasimudeen", phone: "9447060335" },
      { mla: "Linto Joseph", pa: "Mohammed Haneefa", phone: "9539661903" },
      { mla: "T.I Madhusoodanan", pa: "Sajeesh Kumar K.", phone: "9446969526" },
      { mla: "C. R. Mahesh", pa: "Ratheesh Raj R. V.", phone: "9995767329" },
      { mla: "K.P.A. Majeed", pa: "Abdunnasar T. K.", phone: "9847307424" },
      { mla: "Mammikutty", pa: "Deepu K. R.", phone: "9447662114" },
      { mla: "M. M. Mani", pa: "Martin Mathew", phone: "9656975585" },
      { mla: "Mani.C.Kappan", pa: "DR. B. V. Sreekumar", phone: "8921995081" },
      { mla: "Mathew Kuzhalnadan", pa: "Prasanth M. S.", phone: "9388854348" },
      {
        mla: "Mathew T. Thomas",
        pa: "V. G. Madhukkuttan",
        phone: "9446344493",
      },
      { mla: "K. J. Maxy", pa: "A. U. Naisan", phone: "9495158848" },
      { mla: "K.P. Mohanan", pa: "Prakasan K. M.", phone: "9495296571" },
      { mla: "Kurukkoli Moideen", pa: "Ahamed T. K.", phone: "9847084427" },
      { mla: "A.C. Moideen", pa: "Suman K.S.", phone: "9544747188" },
      { mla: "Mons Joseph", pa: "K. Madhusoodanan", phone: "9495122785" },
      { mla: "Muhammed Muhassin", pa: "G. Krishnakumar", phone: "9446103231" },
      { mla: "M. Mukesh", pa: "Shefeek M. S.", phone: "8281803266" },
      { mla: "C.C. Mukundhan", pa: "Mazood K.Vinod", phone: "9446315560" },
      { mla: "M. K. Muneer", pa: "Rajesh R.", phone: "9447211367" },
      { mla: "D. K. Murali", pa: "Ashok Kumar M. S.", phone: "9447555049" },
      { mla: "Murali Perunelly", pa: "Shabu B.", phone: "9048726234" },
      {
        mla: "Najeeb Kanthapuram",
        pa: "Fasal Varis N. M.",
        phone: "9846653258",
      },
      { mla: "P. Nandakumar", pa: "Renjith P. R.", phone: "9633019324" },
      { mla: "N. A. Nellikkunnu", pa: "Abdul Manzoor M.", phone: "9446660006" },
      { mla: "M. Noushad", pa: "Baiju K. V.", phone: "9895043103" },
      { mla: "Chandy Oommen", pa: "Sreekumar R", phone: "8547187955" },
      { mla: "A. Prabhakaran", pa: "Jishnu M. H.", phone: "9895148170" },
      {
        mla: "Pramod Narayan",
        pa: "Benix Kanjiravila T.",
        phone: "9446849558",
      },
      { mla: "V. K. Prasanth", pa: "Anoop Roy R. P.", phone: "9388682432" },
      { mla: "K. D. Prasenan", pa: "E. S. Noormuhammed", phone: "9446830004" },
      { mla: "U. Prathibha", pa: "G. Bijukumar", phone: "9447596043" },
      { mla: "K. Premkumar", pa: "Rajesh C. P.", phone: "9496142527" },
      {
        mla: "Thiruvanchoor Radhakrishnan",
        pa: "Praveen Chandran J. S.",
        phone: "9496287968",
      },
      { mla: "P. T. A. Rahim", pa: "K. Abdul Majeed", phone: "9946228384" },
      { mla: "A. Raja", pa: "Renjith Lal", phone: "9539068078" },
      { mla: "M. Rajagopalan", pa: "P. U. Suresan", phone: "9446022616" },
      { mla: "K. K. Ramachandran", pa: "P. S. Manoj", phone: "9497797998" },
      {
        mla: "Ramachandran Kadannappalli",
        pa: "Sadhanandan",
        phone: "8281915764",
      },
      { mla: "T. P. Ramakrishnan", pa: "Sreejith J.", phone: "9497760884" },
      { mla: "Ramesh Chennithala", pa: "Harikumar K.", phone: "9895424342" },
      { mla: "Thottathil Ravindran", pa: "Ranjith E.", phone: "9388955466" },
      { mla: "K. K. Rema", pa: "Manoj Robinson", phone: "9446554733" },
      { mla: "Roji M. John", pa: "T. R. Reghunathan", phone: "9447226531" },
      { mla: "K.M. Sachindev", pa: "Biju A. M.", phone: "9496968810" },
      { mla: "Sajeev Joseph", pa: "Vineeth E.V.", phone: "9048670088" },
      { mla: "H. Salam", pa: "Satheesh A. T.", phone: "9447269714" },
      { mla: "N. Samsudheen", pa: "M. Shibinu", phone: "9846420265" },
      { mla: "Saneeshkumar Joseph", pa: "V. P. Arun", phone: "9946441067" },
      { mla: "Santhakumari K.", pa: "Anu V. I.", phone: "7907108678" },
      { mla: "V. Sasi", pa: "Sabareesh M S", phone: "9567642960" },
      { mla: "I. B. Satheesh", pa: "Prasanth R.", phone: "9495192386" },
      {
        mla: "Sebastian Kulathunkal",
        pa: "S. C. Pradeep",
        phone: "9495523088",
      },
      { mla: "Shafi Parambil", pa: "Sujith Kumar V.", phone: "9946050052" },
      {
        mla: "K. K. Shailaja Teacher",
        pa: "Promodhkumar",
        phone: "9446674426",
      },
      { mla: "T.Siddique", pa: "Sajith Kumar R.", phone: "9633633988" },
      { mla: "Vazhoor Soman", pa: "Ganesan M.", phone: "9656144901" },
      { mla: "P.V Sreenijin", pa: "Jayaprasad", phone: "9447254139" },
      { mla: "G. Steephen", pa: "Sathyaraj T. L.", phone: "9447390908" },
      { mla: "Sujith Vijayanpillai", pa: "S. Madhukumar", phone: "9447740854" },
      { mla: "Sunny Joseph", pa: "Muhamed Jaseer", phone: "9495952588" },
      { mla: "K.V. Sumesh", pa: "Muhammed Riyas K.", phone: "9947369346" },
      { mla: "P.P. Sumod", pa: "Sminesh", phone: "9846712880" },
      { mla: "V. R. Sunilkumar", pa: "V. K. Madhu", phone: "9446342266" },
      { mla: "P. S. Supal", pa: "Ani Muhammed", phone: "9447589710" },
      { mla: "Kadakampally Surendran", pa: "Joy J.", phone: "9961230754" },
      {
        mla: "E. T. Taison Master",
        pa: "Rameshbabu N. R.",
        phone: "9947919245",
      },
      { mla: "Thomas K. Thomas", pa: "Jonson G.", phone: "9495928100" },
      { mla: "Uma Thomas", pa: "Vinu K. S.", phone: "8075813859" },
      { mla: "P. Ubaidulla", pa: "Jalaludeen C. H.", phone: "9446971907" },
      { mla: "K. N. Unnikrishnan", pa: "Sajith P. S.", phone: "9446467435" },
      { mla: "E. K. Vijayan", pa: "Surendran Kalathil", phone: "9495149516" },
      { mla: "M. Vijin", pa: "Dinesh Elambilan", phone: "9446462137" },
      { mla: "M. Vincent", pa: "R. E. Jose", phone: "9048483362" },
      { mla: "T.J.Vinod", pa: "Hareesh D.", phone: "9447063960" },
      { mla: "P. C. Vishnunadh", pa: "Rajesh B. S.", phone: "9496817107" },
      { mla: "Xavier Chittilappilly", pa: "Gopan J. S.", phone: "9995444260" },
    ];

    return (
      <div className="tabley">
        <h4>PA to MLA</h4>
        <table className="table table myTable2">
          <thead>
            <tr>
              <th scope="col">Sl.No</th>
              <th scope="col">MLA</th>
              <th scope="col">PA</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>

          <tbody>
            {paList.map((row, index) => (
              <tr className="debate" key={index}>
                <td>{index + 1}</td>
                <td>{row.mla}</td>
                <td>{row.pa || "-"}</td>
                <td>{row.phone || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  //   const WatchWard = () => {
  //     // -------------------------------
  //     // MAIN STAFF TABLE
  //     // -------------------------------
  //     const staff = [
  //       {
  //         name: "Sri. Shibu. S",
  //         designation: "Chief Marshal",
  //         phoneOffice: "2052",
  //         mobile: "9539563299",
  //         email: "",
  //         address: `Divyanshi Therakam,
  // Manacaud PO,
  // TVM 695009`,
  //         room: "Room No. 516, I Floor, Assembly Building",
  //       },
  //       {
  //         name: "Sri. Moideen Hussain. H",
  //         designation: "Additional Chief Marshal",
  //         phoneOffice: "2054",
  //         mobile: "9946551882",
  //         email: "",
  //         address: `T/C 3/1204 D 4.p;
  // Lekshmi Nagar,
  // Pattom PO,
  // TVM 695004`,
  //         room: "Room No. 516, I Floor, Assembly Building",
  //       },
  //       {
  //         name: "Sri. Ferose Khan. A",
  //         designation: "Marshal",
  //         phoneOffice: "2054",
  //         mobile: "9744345459",
  //         email: "",
  //         address: `Ange Manakkattil,
  // Thodiyil Veedu,
  // Karichara, Pallippuram,
  // Thiruvananthapuram.
  // PIN - 695316`,
  //         room: "",
  //       },
  //       {
  //         name: "Sri. Suresh Kumar. S",
  //         designation: "Marshal",
  //         phoneOffice: "2054",
  //         mobile: "9645073373",
  //         email: "",
  //         address: `Vijayavilasam,
  // Valamoozhy Nedumpa,
  // Panayamuttom PO,
  // Nedumangadu,
  // TVM - 695561`,
  //         room: "",
  //       },
  //       {
  //         name: "Sri. Joshy. S K",
  //         designation: "Marshal",
  //         phoneOffice: "2054",
  //         mobile: "7012871943",
  //         email: "",
  //         address: `Flat No. K-81,
  // SAP Quarters,
  // Peroorkada PO,
  // TVM 695005`,
  //         room: "",
  //       },
  //       {
  //         name: "Sri. Kamal V Dev",
  //         designation: "Marshal",
  //         phoneOffice: "2054",
  //         mobile: "9447797785",
  //         email: "",
  //         address: `4/288/B, Vasudevam,
  // Maranchalkonam,
  // Naruvamoodu PO,
  // TVM 695020`,
  //         room: "",
  //       },
  //     ];

  //     // -------------------------------
  //     // WATCH & WARD OFFICE CONTACTS
  //     // -------------------------------
  //     const officeContacts = [
  //       { place: "Entrance Back (Assembly Building)", phone: "2054" },
  //       {
  //         place: "Security Frisking (Reception Centre, Legislature Complex)",
  //         phone: "2033",
  //       },
  //       { place: "Main Gate", phone: "2478" },
  //       { place: "Speaker Gate", phone: "2182" },
  //       { place: "Brigade Gate", phone: "2181" },
  //       { place: "Stadium Gate", phone: "2048" },
  //       { place: "Complex Entrance Back", phone: "2180" },
  //       { place: "Press Gate", phone: "2033" },
  //       { place: "Sergeant Room", phone: "2601" },
  //       { place: "Fire & Rescue", phone: "2558" },
  //       { place: "Main Gate (MLA Hostel)", phone: "2607" },
  //       { place: "Rear Gate (MLA Hostel)", phone: "2280" },
  //       { place: "New Block (MLA Hostel)", phone: "2581" },
  //       { place: "Sergeant (MLA Hostel)", phone: "2266" },
  //       { place: "Marshal (MLA Hostel)", phone: "2378" },
  //       { place: "—", phone: "2304" },
  //     ];

  //     return (
  //       <div className="watchward-section mt-3">
  //         {/* MAIN STAFF TABLE */}
  //         <h5>Watch & Ward – Staff Details</h5>

  //         <div className="table-responsive mt-3">
  //           <table className="table table-bordered table-striped">
  //             <thead>
  //               <tr>
  //                 <th>Name & Designation</th>
  //                 <th>Phone (Office)</th>
  //                 <th>Mobile / Residence</th>
  //                 <th>Email</th>
  //                 <th>Residential Address</th>
  //               </tr>
  //             </thead>

  //             <tbody>
  //               {staff.map((row, idx) => (
  //                 <tr key={idx}>
  //                   <td>
  //                     <strong>{row.name}</strong>
  //                     <br />
  //                     {row.designation}
  //                     <br />
  //                     {row.room && <span>{row.room}</span>}
  //                   </td>
  //                   <td>{row.phoneOffice}</td>
  //                   <td>{row.mobile}</td>
  //                   <td>{row.email || "-"}</td>
  //                   <td style={{ whiteSpace: "pre-line" }}>{row.address}</td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>

  //         {/* OFFICE CONTACT NUMBERS TABLE */}
  //         <h5 className="mt-5">Watch & Ward Office – Contact Numbers</h5>

  //         <div className="table-responsive mt-3">
  //           <table className="table table-bordered table-striped">
  //             <thead>
  //               <tr>
  //                 <th>Location</th>
  //                 <th>Phone</th>
  //               </tr>
  //             </thead>

  //             <tbody>
  //               {officeContacts.map((item, idx) => (
  //                 <tr key={idx}>
  //                   <td>{item.place}</td>
  //                   <td>{item.phone}</td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     );
  //   };

  // RIGHT CONTENT FOR Deputed Staffs

  const WatchWard = () => {
    // -------------------------------
    // MAIN STAFF TABLE
    // -------------------------------
    const staff = [
      {
        name: "Sri. Shibu. S",
        designation: "Chief Marshal",
        phoneOffice: "2052",
        mobile: "9539563299",
        email: "",
        address: `Divyanshi Therakam,
Manacaud PO,
TVM 695009`,
        room: "Room No. 516, I Floor, Assembly Building",
      },
      {
        name: "Sri. Moideen Hussain. H",
        designation: "Additional Chief Marshal",
        phoneOffice: "2054",
        mobile: "9946551882",
        email: "",
        address: `T/C 3/1204 D 4.p;
Lekshmi Nagar,
Pattom PO,
TVM 695004`,
        room: "Room No. 516, I Floor, Assembly Building",
      },
      {
        name: "Sri. Ferose Khan. A",
        designation: "Marshal",
        phoneOffice: "2054",
        mobile: "9744345459",
        email: "",
        address: `Ange Manakkattil,
Thodiyil Veedu,
Karichara, Pallippuram,
Thiruvananthapuram.
PIN - 695316`,
        room: "",
      },
      {
        name: "Sri. Suresh Kumar. S",
        designation: "Marshal",
        phoneOffice: "2054",
        mobile: "9645073373",
        email: "",
        address: `Vijayavilasam,
Valamoozhy Nedumpa,
Panayamuttom PO,
Nedumangadu,
TVM - 695561`,
        room: "",
      },
      {
        name: "Sri. Joshy. S K",
        designation: "Marshal",
        phoneOffice: "2054",
        mobile: "7012871943",
        email: "",
        address: `Flat No. K-81,
SAP Quarters,
Peroorkada PO,
TVM 695005`,
        room: "",
      },
      {
        name: "Sri. Kamal V Dev",
        designation: "Marshal",
        phoneOffice: "2054",
        mobile: "9447797785",
        email: "",
        address: `4/288/B, Vasudevam,
Maranchalkonam,
Naruvamoodu PO,
TVM 695020`,
        room: "",
      },
    ];

    // -------------------------------
    // WATCH & WARD OFFICE CONTACTS
    // -------------------------------
    const officeContacts = [
      { place: "Entrance Back (Assembly Building)", phone: "2054" },
      {
        place: "Security Frisking (Reception Centre, Legislature Complex)",
        phone: "2033",
      },
      { place: "Main Gate", phone: "2478" },
      { place: "Speaker Gate", phone: "2182" },
      { place: "Brigade Gate", phone: "2181" },
      { place: "Stadium Gate", phone: "2048" },
      { place: "Complex Entrance Back", phone: "2180" },
      { place: "Press Gate", phone: "2033" },
      { place: "Sergeant Room", phone: "2601" },
      { place: "Fire & Rescue", phone: "2558" },
      { place: "Main Gate (MLA Hostel)", phone: "2607" },
      { place: "Rear Gate (MLA Hostel)", phone: "2280" },
      { place: "New Block (MLA Hostel)", phone: "2581" },
      { place: "Sergeant (MLA Hostel)", phone: "2266" },
      { place: "Marshal (MLA Hostel)", phone: "2378" },
      { place: "—", phone: "2304" },
    ];

    return (
      <div className="watchward-section">
        {/* MAIN STAFF TABLE */}
        <h5>Watch & Ward – Staff Details</h5>

        <div className="tabley mt20">
          <table className="table myTable2">
            <thead>
              <tr>
                <th>Name & Designation</th>
                <th>Phone (Office)</th>
                <th>Mobile / Residence</th>
                <th>Email</th>
                <th>Residential Address</th>
              </tr>
            </thead>

            <tbody>
              {staff.map((row, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{row.name}</strong> <br />
                    {row.designation} <br />
                    {row.room && <span>{row.room}</span>}
                  </td>
                  <td>{row.phoneOffice}</td>
                  <td>{row.mobile}</td>
                  <td>{row.email || "-"}</td>
                  <td style={{ whiteSpace: "pre-line" }}>{row.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* OFFICE CONTACT NUMBERS TABLE */}
        <h5 className="mt-5">Watch & Ward Office – Contact Numbers</h5>

        <div className="tabley mt20">
          <table className="table myTable2">
            <thead>
              <tr>
                <th>Location</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {officeContacts.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.place}</td>
                  <td>{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const deputedPanels = {
    agri: (
      <div>
        <h4>Agricultural </h4>
        <div className="container mt-4">
          <div className="row ">
            <p>
              Agricultural Officer (Room No. 402, D Block, III Floor,
              Administrative Building)
            </p>
          </div>
        </div>
      </div>
    ),
    fire: (
      <div>
        <h4>Fire and Safety </h4>
        <div className="container mt-4">
          <div className="row ">
            <p>Fire & Rescue - 2607</p>
          </div>
        </div>
      </div>
    ),
    health: <HealthContent />,

    pa: <PAToMLAs />,
    ward: <WatchWard />,
  };

  // --------------------------------------------------
  // LEFT MENU DATA: Other Departments
  // --------------------------------------------------
  const otherDeptMenu = [
    {
      key: "other",
      label: "Other Departments",
      children: [
        { key: "canteen", label: "Canteen" },
        { key: "clinics", label: "Clinics" },
        { key: "enquiries", label: "Enquiries" },
        { key: "pwd", label: "PWD" },
        { key: "railway", label: "Railway Counter" },
        { key: "sbi", label: "SBI Extension Counter" },
        { key: "coop", label: "Secretariat Staff Co-operative Society" },
        { key: "house", label: "Staff Housing Co-operative Society" },
        { key: "sis", label: "Sisunikethan" },
        { key: "tel", label: "Telephone Exchange" },
        { key: "treasury", label: "Treasury" },
      ],
    },
  ];

  // RIGHT CONTENT FOR Other Departments
  const otherDeptPanels = {
    canteen: <CanteenDetails />,
    clinics: <Clinics />,
    enquiries: <Enquires />,
    pwd: <PWD />,
    railway: <Railway />,
    sbi: <SBIExtensionCounter />,
    coop: <StaffCoopSocietyCounter />,
    house: <StaffHousingCoopSocietyCounter />,
    sis: <Sisunikethan />,
    tel: <TelephoneExchange />,
    treasury: <SubTreasury />,
  };

  // --------------------------------------------------
  // COMPONENT RENDER
  // --------------------------------------------------
  return (
    <div className="wrapper ovh">
      {/* ---------------- HEADER ---------------- */}
      <header
        className={`header-nav nav-homepage-style2 stricky main-menu ${
          isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
        }`}
      >
        <HomeTest />
      </header>

      <div className="body_content">
        {/* ---------------- NAVIGATION ---------------- */}
        <CategoriesNav />
        <BreadcrumbNav
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Other Important Nos.", href: "/other-impt-nos" },
            { name: "Other Important Nos", href: "#" },
          ]}
        />

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Other Important Nos." />

            <Tabs
              tabs={[
                {
                  key: "deputed",
                  label: "Deputed Staffs",
                  content: (
                    <div className=" mt-4 mb-4">
                      <VerticalTabs menu={deputedMenu} panels={deputedPanels} />
                    </div>
                  ),
                },
                {
                  key: "otherDepts",
                  label: "Other Departments",
                  content: (
                    <div className=" mt-4 mb-4">
                      <VerticalTabs
                        menu={otherDeptMenu}
                        panels={otherDeptPanels}
                      />
                    </div>
                  ),
                },
              ]}
              onChange={() => {}}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default OtherImptNo;
