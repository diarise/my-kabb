import React from 'react';
import { hashHistory } from 'react-router';

import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(event) {
        this.props.store.setProfileField(event.target.name, event.target.value);
    }

    handleBlur(event) {
        this.props.store.profile[event.target.name].validate();
    }

    handleSubmit(event) {
        let { profile } = this.props.store;
				let { subscriptionType } = this.props.store;
        let valid = this.props.store.validateProfile();
        event.preventDefault();
        if (valid) {
					if(subscriptionType == 'free') {
							this.props.store.submitRegistration(profile);
							hashHistory.push('result');
					} else {
							hashHistory.push('payment');
						}
        }
    }

    renderInputField(name) {
        let field = this.props.store.profile[name];

        return (
            <div class={'form-group ' + (field.errors.length > 0 && 'has-error')}>
                <div class="col-md-12">
                    <input 
                        name={field.name}
                        placeholder={field.label}
                        class="form-control" 
                        type="text" 
                        value={field.value}
                        onChange={this.handleChange} 
                        onBlur={this.handleBlur} />
                        {field.errors.length > 0 && field.errors.map(error => (
                            <span key={error} class="text-danger">
                                {error}&nbsp;
                            </span>
                        ))}
                </div>
            </div>
        );

    }
		
		renderPasswordInputField(name) {
        let field = this.props.store.profile[name];

        return (
            <div class={'form-group ' + (field.errors.length > 0 && 'has-error')}>
                <div class="col-md-12">
                    <input 
                        name={field.name}
                        placeholder={field.label}
                        class="form-control" 
                        type="password" 
                        value={field.value}
                        onChange={this.handleChange} 
                        onBlur={this.handleBlur} />
                        {field.errors.length > 0 && field.errors.map(error => (
                            <span key={error} class="text-danger">
                                {error}&nbsp;
                            </span>
                        ))}
                </div>
            </div>
        );

    }
		renderSelectInputField(name, options) {
        let field = this.props.store.profile[name];
				var optionList = []
				if (options.length != 0) {
					for (var i = 0; i < options.length; i++) {
						optionList.push(
							< option value = {options[i]['value']} key={i} > {options[i]['label']} < /option>
						)
					}
				}
        return (
            <div class={'form-group ' + (field.errors.length > 0 && 'has-error')}>
                <div class="col-md-12">
									<select 
										value={field.value} 
										name={field.name} 
										class="form-control" 
										onChange={this.handleChange} 
										onBlur={this.handleBlur}>
										{optionList}
									</select>
									{field.errors.length > 0 && field.errors.map(error => (
											<span key={error} class="text-danger">
													{error}&nbsp;
											</span>
									))}
                </div>
            </div>
        );

    }
    render() {
        /* TODO I started you off with firstname and lastname, but now
            we need to add the rest of the profile fields. These are all 
            the fields on the IDP regiration form except credit card
            information. Notice that the Field class in store.js only does
            basic validation. This class should be tweaked to accomodate
            more complex validation, such as email address (regex based)
            validation, etc. */
						
				let months = [{ value: '', label: 'Please Choose DOB Month' },{ value: '01', label: 'JAN' },{ value: '02', label: 'FEB' },{ value: '03', label: 'MAR' },{ value: '04', label: 'APR' },{ value: '05', label: 'MAY' },{ value: '06', label: 'JUN' },{ value: '07', label: 'JUL' },{ value: '08', label: 'AUG' },{ value: '09', label: 'SEP' },{ value: '10', label: 'OCT' },{ value: '11', label: 'NOV' },{ value: '12', label: 'DEC' }];		
				let days = [{ value: '', label: 'Please Choose DOB Day' },{ value: '01', label: '01' },{ value: '02', label: '02' },{ value: '03', label: '03' },{ value: '04', label: '04' },{ value: '05', label: '05' },{ value: '06', label: '06' },{ value: '07', label: '07' },{ value: '08', label: '08' },{ value: '09', label: '09' },{ value: '10', label: '10' },{ value: '11', label: '11' },{ value: '12', label: '12' },{ value: '13', label: '13' },{ value: '14', label: '14' },{ value: '15', label: '15' },{ value: '16', label: '16' },{ value: '17', label: '17' },{ value: '18', label: '18' },{ value: '19', label: '19' },{ value: '20', label: '20' },{ value: '21', label: '21' },{ value: '22', label: '22' },{ value: '23', label: '23' },{ value: '24', label: '24' },{ value: '25', label: '25' },{ value: '26', label: '26' },{ value: '27', label: '27' },{ value: '28', label: '28' },{ value: '29', label: '29' },{ value: '30', label: '30' },{ value: '31', label: '31' }];	
				var myDate = new Date();
				var year = myDate.getFullYear();
				var years = [{ value: '', label: 'Please Choose DOB Year' }];
					for(var i = 1900; i < year+1; i++){
						years.push({ value: i, label: i })
					}
				let gender = [{ value: '', label: 'Please Choose Gender' },{ value: 'male', label: 'Male' },{ value: 'female', label: 'Female' }];
				let teacher = [{ value: '', label: 'Please Choose Teacher' },{ value: 'None', label: 'None' },{ value: 'Abe Hardoon', label: 'Abe Hardoon' },{ value: 'Adriana D`armas', label: 'Adriana D`armas' },{ value: 'Agnieszka Tomaszewska', label: 'Agnieszka Tomaszewska' },{ value: 'Aharon Hacohen', label: 'Aharon Hacohen'}];
				let language = [{ value: '', label: 'Please Choose Language' },{ value: 'english', label: 'English' },{ value: 'spanish', label: 'Spanish' },{ value: 'russian', label: 'Russian' }];
				let country = [	{
													label: "Please Choose Country",
													value: ""
												},
												{
													label: "Afghanistan",
													value: "AF"
												}, {
													label: "Aland Islands",
													value: "AX"
												}, {
													label: "Albania",
													value: "AL"
												}, {
													label: "Algeria",
													value: "DZ"
												}, {
													label: "American Samoa",
													value: "AS"
												}, {
													label: "Andorra",
													value: "AD"
												}, {
													label: "Angola",
													value: "AO"
												}, {
													label: "Anguilla",
													value: "AI"
												}, {
													label: "Antarctica",
													value: "AQ"
												}, {
													label: "Antigua and Barbuda",
													value: "AG"
												}, {
													label: "Argentina",
													value: "AR"
												}, {
													label: "Armenia",
													value: "AM"
												}, {
													label: "Aruba",
													value: "AW"
												}, {
													label: "Australia",
													value: "AU"
												}, {
													label: "Austria",
													value: "AT"
												}, {
													label: "Azerbaijan",
													value: "AZ"
												}, {
													label: "Bahamas",
													value: "BS"
												}, {
													label: "Bahrain",
													value: "BH"
												}, {
													label: "Bangladesh",
													value: "BD"
												}, {
													label: "Barbados",
													value: "BB"
												}, {
													label: "Belarus",
													value: "BY"
												}, {
													label: "Belgium",
													value: "BE"
												}, {
													label: "Belize",
													value: "BZ"
												}, {
													label: "Benin",
													value: "BJ"
												}, {
													label: "Bermuda",
													value: "BM"
												}, {
													label: "Bhutan",
													value: "BT"
												}, {
													label: "Bolivia, Plurinational State of",
													value: "BO"
												}, {
													label: "Bonaire, Sint Eustatius and Saba",
													value: "BQ"
												}, {
													label: "Bosnia and Herzegovina",
													value: "BA"
												}, {
													label: "Botswana",
													value: "BW"
												}, {
													label: "Bouvet Island",
													value: "BV"
												}, {
													label: "Brazil",
													value: "BR"
												}, {
													label: "British Indian Ocean Territory",
													value: "IO"
												}, {
													label: "Brunei Darussalam",
													value: "BN"
												}, {
													label: "Bulgaria",
													value: "BG"
												}, {
													label: "Burkina Faso",
													value: "BF"
												}, {
													label: "Burundi",
													value: "BI"
												}, {
													label: "Cambodia",
													value: "KH"
												}, {
													label: "Cameroon",
													value: "CM"
												}, {
													label: "Canada",
													value: "CA"
												}, {
													label: "Cape Verde",
													value: "CV"
												}, {
													label: "Cayman Islands",
													value: "KY"
												}, {
													label: "Central African Republic",
													value: "CF"
												}, {
													label: "Chad",
													value: "TD"
												}, {
													label: "Chile",
													value: "CL"
												}, {
													label: "China",
													value: "CN"
												}, {
													label: "Christmas Island",
													value: "CX"
												}, {
													label: "Cocos (Keeling) Islands",
													value: "CC"
												}, {
													label: "Colombia",
													value: "CO"
												}, {
													label: "Comoros",
													value: "KM"
												}, {
													label: "Congo",
													value: "CG"
												}, {
													label: "Congo, the Democratic Republic of the",
													value: "CD"
												}, {
													label: "Cook Islands",
													value: "CK"
												}, {
													label: "Costa Rica",
													value: "CR"
												}, {
													label: "Cote d'Ivoire",
													value: "CI"
												}, {
													label: "Croatia",
													value: "HR"
												}, {
													label: "Cuba",
													value: "CU"
												}, {
													label: "Curacao",
													value: "CW"
												}, {
													label: "Cyprus",
													value: "CY"
												}, {
													label: "Czech Republic",
													value: "CZ"
												}, {
													label: "Denmark",
													value: "DK"
												}, {
													label: "Djibouti",
													value: "DJ"
												}, {
													label: "Dominica",
													value: "DM"
												}, {
													label: "Dominican Republic",
													value: "DO"
												}, {
													label: "Ecuador",
													value: "EC"
												}, {
													label: "Egypt",
													value: "EG"
												}, {
													label: "El Salvador",
													value: "SV"
												}, {
													label: "Equatorial Guinea",
													value: "GQ"
												}, {
													label: "Eritrea",
													value: "ER"
												}, {
													label: "Estonia",
													value: "EE"
												}, {
													label: "Ethiopia",
													value: "ET"
												}, {
													label: "Falkland Islands (Malvinas)",
													value: "FK"
												}, {
													label: "Faroe Islands",
													value: "FO"
												}, {
													label: "Fiji",
													value: "FJ"
												}, {
													label: "Finland",
													value: "FI"
												}, {
													label: "France",
													value: "FR"
												}, {
													label: "French Guiana",
													value: "GF"
												}, {
													label: "French Polynesia",
													value: "PF"
												}, {
													label: "French Southern Territories",
													value: "TF"
												}, {
													label: "Gabon",
													value: "GA"
												}, {
													label: "Gambia",
													value: "GM"
												}, {
													label: "Georgia",
													value: "GE"
												}, {
													label: "Germany",
													value: "DE"
												}, {
													label: "Ghana",
													value: "GH"
												}, {
													label: "Gibraltar",
													value: "GI"
												}, {
													label: "Greece",
													value: "GR"
												}, {
													label: "Greenland",
													value: "GL"
												}, {
													label: "Grenada",
													value: "GD"
												}, {
													label: "Guadeloupe",
													value: "GP"
												}, {
													label: "Guam",
													value: "GU"
												}, {
													label: "Guatemala",
													value: "GT"
												}, {
													label: "Guernsey",
													value: "GG"
												}, {
													label: "Guinea",
													value: "GN"
												}, {
													label: "Guinea-Bissau",
													value: "GW"
												}, {
													label: "Guyana",
													value: "GY"
												}, {
													label: "Haiti",
													value: "HT"
												}, {
													label: "Heard Island and McDonald Islands",
													value: "HM"
												}, {
													label: "Holy See (Vatican City State)",
													value: "VA"
												}, {
													label: "Honduras",
													value: "HN"
												}, {
													label: "Hong Kong",
													value: "HK"
												}, {
													label: "Hungary",
													value: "HU"
												}, {
													label: "Iceland",
													value: "IS"
												}, {
													label: "India",
													value: "IN"
												}, {
													label: "Indonesia",
													value: "ID"
												}, {
													label: "Iran, Islamic Republic of",
													value: "IR"
												}, {
													label: "Iraq",
													value: "IQ"
												}, {
													label: "Ireland",
													value: "IE"
												}, {
													label: "Isle of Man",
													value: "IM"
												}, {
													label: "Israel",
													value: "IL"
												}, {
													label: "Italy",
													value: "IT"
												}, {
													label: "Jamaica",
													value: "JM"
												}, {
													label: "Japan",
													value: "JP"
												}, {
													label: "Jersey",
													value: "JE"
												}, {
													label: "Jordan",
													value: "JO"
												}, {
													label: "Kazakhstan",
													value: "KZ"
												}, {
													label: "Kenya",
													value: "KE"
												}, {
													label: "Kiribati",
													value: "KI"
												}, {
													label: "Korea, Democratic People's Republic of",
													value: "KP"
												}, {
													label: "Korea, Republic of",
													value: "KR"
												}, {
													label: "Kuwait",
													value: "KW"
												}, {
													label: "Kyrgyzstan",
													value: "KG"
												}, {
													label: "Lao People's Democratic Republic",
													value: "LA"
												}, {
													label: "Latvia",
													value: "LV"
												}, {
													label: "Lebanon",
													value: "LB"
												}, {
													label: "Lesotho",
													value: "LS"
												}, {
													label: "Liberia",
													value: "LR"
												}, {
													label: "Libya",
													value: "LY"
												}, {
													label: "Liechtenstein",
													value: "LI"
												}, {
													label: "Lithuania",
													value: "LT"
												}, {
													label: "Luxembourg",
													value: "LU"
												}, {
													label: "Macao",
													value: "MO"
												}, {
													label: "Macedonia, the Former Yugoslav Republic of",
													value: "MK"
												}, {
													label: "Madagascar",
													value: "MG"
												}, {
													label: "Malawi",
													value: "MW"
												}, {
													label: "Malaysia",
													value: "MY"
												}, {
													label: "Maldives",
													value: "MV"
												}, {
													label: "Mali",
													value: "ML"
												}, {
													label: "Malta",
													value: "MT"
												}, {
													label: "Marshall Islands",
													value: "MH"
												}, {
													label: "Martinique",
													value: "MQ"
												}, {
													label: "Mauritania",
													value: "MR"
												}, {
													label: "Mauritius",
													value: "MU"
												}, {
													label: "Mayotte",
													value: "YT"
												}, {
													label: "Mexico",
													value: "MX"
												}, {
													label: "Micronesia, Federated States of",
													value: "FM"
												}, {
													label: "Moldova, Republic of",
													value: "MD"
												}, {
													label: "Monaco",
													value: "MC"
												}, {
													label: "Mongolia",
													value: "MN"
												}, {
													label: "Montenegro",
													value: "ME"
												}, {
													label: "Montserrat",
													value: "MS"
												}, {
													label: "Morocco",
													value: "MA"
												}, {
													label: "Mozambique",
													value: "MZ"
												}, {
													label: "Myanmar",
													value: "MM"
												}, {
													label: "Namibia",
													value: "NA"
												}, {
													label: "Nauru",
													value: "NR"
												}, {
													label: "Nepal",
													value: "NP"
												}, {
													label: "Netherlands",
													value: "NL"
												}, {
													label: "New Caledonia",
													value: "NC"
												}, {
													label: "New Zealand",
													value: "NZ"
												}, {
													label: "Nicaragua",
													value: "NI"
												}, {
													label: "Niger",
													value: "NE"
												}, {
													label: "Nigeria",
													value: "NG"
												}, {
													label: "Niue",
													value: "NU"
												}, {
													label: "Norfolk Island",
													value: "NF"
												}, {
													label: "Northern Mariana Islands",
													value: "MP"
												}, {
													label: "Norway",
													value: "NO"
												}, {
													label: "Oman",
													value: "OM"
												}, {
													label: "Pakistan",
													value: "PK"
												}, {
													label: "Palau",
													value: "PW"
												}, {
													label: "Palestine, State of",
													value: "PS"
												}, {
													label: "Panama",
													value: "PA"
												}, {
													label: "Papua New Guinea",
													value: "PG"
												}, {
													label: "Paraguay",
													value: "PY"
												}, {
													label: "Peru",
													value: "PE"
												}, {
													label: "Philippines",
													value: "PH"
												}, {
													label: "Pitcairn",
													value: "PN"
												}, {
													label: "Poland",
													value: "PL"
												}, {
													label: "Portugal",
													value: "PT"
												}, {
													label: "Puerto Rico",
													value: "PR"
												}, {
													label: "Qatar",
													value: "QA"
												}, {
													label: "Reunion",
													value: "RE"
												}, {
													label: "Romania",
													value: "RO"
												}, {
													label: "Russian Federation",
													value: "RU"
												}, {
													label: "Rwanda",
													value: "RW"
												}, {
													label: "Saint Barthelemy",
													value: "BL"
												}, {
													label: "Saint Helena, Ascension and Tristan da Cunha",
													value: "SH"
												}, {
													label: "Saint Kitts and Nevis",
													value: "KN"
												}, {
													label: "Saint Lucia",
													value: "LC"
												}, {
													label: "Saint Martin (French part)",
													value: "MF"
												}, {
													label: "Saint Pierre and Miquelon",
													value: "PM"
												}, {
													label: "Saint Vincent and the Grenadines",
													value: "VC"
												}, {
													label: "Samoa",
													value: "WS"
												}, {
													label: "San Marino",
													value: "SM"
												}, {
													label: "Sao Tome and Principe",
													value: "ST"
												}, {
													label: "Saudi Arabia",
													value: "SA"
												}, {
													label: "Senegal",
													value: "SN"
												}, {
													label: "Serbia",
													value: "RS"
												}, {
													label: "Seychelles",
													value: "SC"
												}, {
													label: "Sierra Leone",
													value: "SL"
												}, {
													label: "Singapore",
													value: "SG"
												}, {
													label: "Sint Maarten (Dutch part)",
													value: "SX"
												}, {
													label: "Slovakia",
													value: "SK"
												}, {
													label: "Slovenia",
													value: "SI"
												}, {
													label: "Solomon Islands",
													value: "SB"
												}, {
													label: "Somalia",
													value: "SO"
												}, {
													label: "South Africa",
													value: "ZA"
												}, {
													label: "South Georgia and the South Sandwich Islands",
													value: "GS"
												}, {
													label: "South Sudan",
													value: "SS"
												}, {
													label: "Spain",
													value: "ES"
												}, {
													label: "Sri Lanka",
													value: "LK"
												}, {
													label: "Sudan",
													value: "SD"
												}, {
													label: "Suriname",
													value: "SR"
												}, {
													label: "Svalbard and Jan Mayen",
													value: "SJ"
												}, {
													label: "Swaziland",
													value: "SZ"
												}, {
													label: "Sweden",
													value: "SE"
												}, {
													label: "Switzerland",
													value: "CH"
												}, {
													label: "Syrian Arab Republic",
													value: "SY"
												}, {
													label: "Taiwan, Province of China",
													value: "TW"
												}, {
													label: "Tajikistan",
													value: "TJ"
												}, {
													label: "Tanzania, United Republic of",
													value: "TZ"
												}, {
													label: "Thailand",
													value: "TH"
												}, {
													label: "Timor-Leste",
													value: "TL"
												}, {
													label: "Togo",
													value: "TG"
												}, {
													label: "Tokelau",
													value: "TK"
												}, {
													label: "Tonga",
													value: "TO"
												}, {
													label: "Trinidad and Tobago",
													value: "TT"
												}, {
													label: "Tunisia",
													value: "TN"
												}, {
													label: "Turkey",
													value: "TR"
												}, {
													label: "Turkmenistan",
													value: "TM"
												}, {
													label: "Turks and Caicos Islands",
													value: "TC"
												}, {
													label: "Tuvalu",
													value: "TV"
												}, {
													label: "Uganda",
													value: "UG"
												}, {
													label: "Ukraine",
													value: "UA"
												}, {
													label: "United Arab Emirates",
													value: "AE"
												}, {
													label: "United Kingdom",
													value: "GB"
												}, {
													label: "United States",
													value: "US"
												}, {
													label: "United States Minor Outlying Islands",
													value: "UM"
												}, {
													label: "Uruguay",
													value: "UY"
												}, {
													label: "Uzbekistan",
													value: "UZ"
												}, {
													label: "Vanuatu",
													value: "VU"
												}, {
													label: "Venezuela, Bolivarian Republic of",
													value: "VE"
												}, {
													label: "Viet Nam",
													value: "VN"
												}, {
													label: "Virgin Islands, British",
													value: "VG"
												}, {
													label: "Virgin Islands, U.S.",
													value: "VI"
												}, {
													label: "Wallis and Futuna",
													value: "WF"
												}, {
													label: "Western Sahara",
													value: "EH"
												}, {
													label: "Yemen",
													value: "YE"
												}, {
													label: "Zambia",
													value: "ZM"
												}, {
													label: "Zimbabwe",
													value: "ZW"
												}]
        return (
            <form class="form-horizontal" onSubmit={this.handleSubmit}>
                {this.renderInputField('firstName')}
                {this.renderInputField('lastName')}
								{this.renderInputField('userName')}
								{this.renderInputField('email')}
								{this.renderInputField('confirmEmail')}
								{this.renderPasswordInputField('pass')}
								{this.renderPasswordInputField('confirmPass')}
								{this.renderSelectInputField('month',months)}
								{this.renderSelectInputField('day',days)}
								{this.renderSelectInputField('year',years)}
								{this.renderSelectInputField('gender',gender)}
								{this.renderSelectInputField('teacher',teacher)}
								{this.renderSelectInputField('country',country)}
								{this.renderInputField('state')}
								{this.renderInputField('city')}
								{this.renderSelectInputField('language',language)}
								{this.renderInputField('billingPhone')}
                <div class="form-group">
                    <div class="col-md-12">                                
                        <input 
                            type="submit" 
                            value="Create Account" 
                            class="btn btn-primary btn-block" />
                    </div>
                </div>
            </form>
        );
     }
}
