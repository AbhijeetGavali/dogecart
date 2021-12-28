const data = [
  {
    countryName: "India",
    countryCode: "+91",
    stateList: [
      "AP | Andhra Pradesh",
      "AR | Arunachal Pradesh",
      "AS | Assam",
      "BR | Bihar",
      "CT | Chhattisgarh",
      "GA | Goa",
      "GJ | Gujarat",
      "HR | Haryana",
      "HP | Himachal Pradesh",
      "JK | Jammu and Kashmir",
      "JH | Jharkhand",
      "KA | Karnataka",
      "KL | Kerala",
      "MP | Madhya Pradesh",
      "MH | Maharashtra",
      "MN | Manipur",
      "ML | Meghalaya",
      "MZ | Mizoram",
      "NL | Nagaland",
      "OR | Odisha",
      "PB | Punjab",
      "RJ | Rajasthan",
      "SK | Sikkim",
      "TN | Tamil Nadu",
      "TG | Telangana",
      "TR | Tripura",
      "UT | Uttarakhand",
      "UP | Uttar Pradesh",
      "WB | West Bengal",
      "AN | Andaman and Nicobar Islands",
      "CH | Chandigarh",
      "DN | Dadra and Nagar Haveli",
      "DD | Daman and Diu",
      "DL | Delhi",
      "LD | Lakshadweep",
      "PY | Puducherry",
    ],
  },
  {
    countryName: "United States",
    countryCode: "+1",
    stateList: [
      "AL | Alabama",
      "AK | Alaska",
      "AZ | Arizona",
      "AR | Arkansas",
      "CA | California",
      "CO | Colorado",
      "CT | Connecticut",
      "DE | Delaware",
      "DC | District Of Columbia",
      "FL | Florida",
      "GA | Georgia",
      "HI | Hawaii",
      "ID | Idaho",
      "IL | Illinois",
      "IN | Indiana",
      "IA | Iowa",
      "KS | Kansas",
      "KY | Kentucky",
      "LA | Louisiana",
      "ME | Maine",
      "MD | Maryland",
      "MA | Massachusetts",
      "MI | Michigan",
      "MN | Minnesota",
      "MS | Mississippi",
      "MO | Missouri",
      "MT | Montana",
      "NE | Nebraska",
      "NV | Nevada",
      "NH | New Hampshire",
      "NJ | New Jersey",
      "NM | New Mexico",
      "NY | New York",
      "NC | North Carolina",
      "ND | North Dakota",
      "OH | Ohio",
      "OK | Oklahoma",
      "OR | Oregon",
      "PA | Pennsylvania",
      "RI | Rhode Island",
      "SC | South Carolina",
      "SD | South Dakota",
      "TN | Tennessee",
      "TX | Texas",
      "UT | Utah",
      "VT | Vermont",
      "VA | Virginia",
      "WA | Washington",
      "WV | West Virginia",
      "WI | Wisconsin",
      "WY | Wyoming",
    ],
  },
];

const Country = require("../../auth/database/mongoModels/details/countryList.model");
const CountryDetails = require("../../auth/database/mongoModels/details/contryDetails.model");

module.exports = async function addCountry(req, res) {
  try {
    data.map((details) => {
      Country.findOne({
        countryName: details.countryName,
      }).then((country) => {
        if (country) {
          console.log("Country", country);
          var detailsData = { ...details, countryId: country._id };
          console.log(detailsData);
          CountryDetails.create(detailsData)
            .then((cntry) => {
              console.log("data inserted => ", cntry);
            })
            .catch((error) => {
              console.log("Error =>", "error1");
            });
        } else {
          console.log("Contry not found =>", country);
        }
      });
    });
    return res.send("Done");
  } catch (error) {
    console.log("Error =>", "error");
    return res.status(500).send("Internal server error");
  }
};
