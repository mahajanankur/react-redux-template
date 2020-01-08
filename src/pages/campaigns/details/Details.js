import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import DateTime from 'react-datetime';

import { createCampiagn, getCampiagnById } from "../../../actions/events";

import Header from "../../../components/Header/Header";
// import s from './Dashboard.scss';
import './Details.scss';

class Details extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      campaignId: this.props.location.state && this.props.location.state.campaignId ? this.props.location.state.campaignId : null,
      assets: [{ url: '' }],
      inclusions: [{ include: '' }],
      instuctions: [{ instuction: '' }],
      thingsToCarry: [{ thing: '' }],
      itineraries: [{ date: new Date(), heading: "", body: "" }],
      heading: '',
      body: '',
      price: 800,
      startTime: new Date(),
      endTime: new Date(),
      footer: '',
      altitude: 1600,
      baseCamp: '',
      trekType: 'Easy',
      roadHead: null,
      railHead: null,
      email: '',
      mobile: '',
      landline: null,
      alternate: null,
      pincode: 174031,
      address: '',
      // isCreating: this.props.isCreating,
      // campaign: this.props.campaign
    };
    // this.headingChange = this.headingChange.bind(this);
    // this.addGenericDynamicField = this.addGenericDynamicField.bind(this);
  }

  componentWillMount() {
    const campaignId = this.state.campaignId;
    if (campaignId) {
      this.props.dispatch(getCampiagnById(campaignId)).then(() => {
        this.setState({
          campaign: this.props.campaign,
          heading: this.props.campaign.heading,
          body: this.props.campaign.body,
          price: this.props.campaign.price,
          startTime: this.props.campaign.startTime,
          endTime: this.props.campaign.endTime,
          footer: this.props.campaign.footer,

          factId: this.props.campaign.fact.id,
          altitude: this.props.campaign.fact.altitude,
          baseCamp: this.props.campaign.fact.baseCamp,
          trekType: this.props.campaign.fact.trekType,
          roadHead: this.props.campaign.fact.roadHead,
          railHead: this.props.campaign.fact.railHead,

          assets: this.props.campaign.assets,
          inclusions: this.props.campaign.inclusions,
          instuctions: this.props.campaign.instuctions,
          thingsToCarry: this.props.campaign.thingsToCarry,
          itineraries: this.props.campaign.itineraries,

          contactId: this.props.campaign.contact.id,
          email: this.props.campaign.contact.email,
          mobile: this.props.campaign.contact.mobile,
          landline: this.props.campaign.contact.landline,
          alternate: this.props.campaign.contact.alternate,

          locationId: this.props.campaign.location.id,
          pincode: this.props.campaign.location.pincode,
          address: this.props.campaign.location.address
        });
      });
    }
  }

  addGenericDynamicField = (stateKey, base) => {
    this.setState({ [stateKey]: this.state[stateKey].concat([base]) });
  }

  removeGenericDynamicField = (index, stateKey) => {
    this.setState({ [stateKey]: this.state[stateKey].filter((element, idx) => index !== idx) });
  }

  changeGenericDynamicFields = (index, stateKey, name) => (event) => {
    const recent = this.state[stateKey].map((element, idx) => {
      return (index !== idx) ? element : { ...element, [name]: event.target.value };
    });
    // console.log(`New ${stateKey} state: `, recent);
    this.setState({ [stateKey]: recent });
  }

  changeDate = (index, stateKey, name) => (moment) => {
    const recent = this.state[stateKey].map((element, idx) => {
      return (index !== idx) ? element : { ...element, [name]: moment.toDate() };
    });
    // console.log(`New ${stateKey} state: `, recent);
    this.setState({ [stateKey]: recent });
  }

  handleGenericOnChange = (event) => {
    const target = event.target;
    if (target) {
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value });
    }
  }

  handleGenericDateOnChange = (stateKey) => (moment) => {
    this.setState({ [stateKey]: moment.toDate() });
  }

  submitUpdateCampaignForm = (event) => {
    // let body = createCampaignBody();
    let body = {
      id: this.prop.fact.id,
      heading: this.state.heading,
      body: this.state.body,
      price: this.state.price,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      footer: this.state.footer,
      fact: {
        id: this.prop.fact.id,
        altitude: this.state.altitude,
        baseCamp: this.state.baseCamp,
        trekType: this.state.trekType,
        busHead: this.state.busHead,
        railHead: this.state.railHead
      },
      contact: {
        email: this.state.email,
        mobile: this.state.mobile,
        landline: this.state.landline,
        alternate: this.state.alternate,
        address: this.state.address
      },
      location: {
        postalCode: this.state.pincode,
        address: this.state.address
      },
      assets: this.state.assets,
      inclusions: this.state.inclusions,
      instuctions: this.state.instuctions,
      thingsToCarry: this.state.thingsToCarry,
      itineraries: this.state.itineraries
    };
    console.log("Update Campaign Body: ", JSON.stringify(body));
    this.props.dispatch(createCampiagn(body));
    event.preventDefault();
  }

  render() {
    const assetsBase = { url: '' };
    const inclusionBase = { include: '' };
    const instuctionBase = { instuction: '' };
    const thingsToCarryBase = { thing: '' };
    const itineraryBase = { date: new Date(), heading: "", body: "" };
    return (
      <div>
        <Header />
        <div className="root">
          {this.props.message &&
            <p align='center' style={{ color: 'red' }}>{this.props.message}</p>
          }
          <Form onSubmit={this.submitUpdateCampaignForm.bind(this)}>
            <h5 align='left' style={{ color: 'black' }}>Update Campaign</h5>
            <Row>
              <Col sm={6} md={6}>
                <Form.Group controlId="campaignId">
                  <Col sm={10}>
                    <Form.Control type="text" placeholder="campaignId" name="campaignId" required value={this.state.campaignId} disabled />
                  </Col>
                </Form.Group>
                <Form.Group controlId="heading">
                  <Col sm={10}>
                    <Form.Control type="text" placeholder="Heading" name="heading" required onChange={this.handleGenericOnChange} value={this.state.heading} />
                  </Col>
                </Form.Group>
                <Form.Group controlId="body">
                  <Col sm={10}>
                    <Form.Control as="textarea" placeholder="Body" rows={5} required name="body" onChange={this.handleGenericOnChange} value={this.state.body} />
                  </Col>
                </Form.Group>
                <Form.Group controlId="price">
                  <Col sm={10}>
                    <Form.Control type="number" step="1" pattern="\d+" placeholder="Price" required name="price" onChange={this.handleGenericOnChange} value={this.state.price} />
                  </Col>
                </Form.Group>
                <Form.Group controlId="date">
                  <Col sm={10}>
                    <Row>
                      <Col sm={6}>
                        <DateTime dateFormat="DD/MM/YYYY" inputProps={{ placeholder: 'Start Time', required: true }} onChange={this.handleGenericDateOnChange("startTime")} value={this.state.startTime} />
                      </Col>
                      <Col sm={6}>
                        <DateTime dateFormat="DD/MM/YYYY" inputProps={{ placeholder: 'End Time', required: true }} onChange={this.handleGenericDateOnChange("endTime")} value={this.state.endTime} />
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>
                <Form.Group controlId="footer">
                  <Col sm={10}>
                    <Form.Control as="textarea" placeholder="Footer" required name="footer" onChange={this.handleGenericOnChange} value={this.state.footer} />
                  </Col>
                </Form.Group>
                <Form.Group controlId="factFirst">
                  <Col sm={10}>
                    <Row>
                      <Col sm={4}>
                        <Form.Control type="number" step="1" pattern="\d+" placeholder="Altitude" required name="altitude" onChange={this.handleGenericOnChange} value={this.state.altitude} />
                      </Col>
                      <Col sm={4}>
                        <Form.Control type="text" placeholder="Base camp" required name="baseCamp" onChange={this.handleGenericOnChange} value={this.state.baseCamp} />
                      </Col>
                      <Col sm={4}>
                        <Form.Control type="text" placeholder="Trek type" required name="trekType" onChange={this.handleGenericOnChange} value={this.state.trekType} />
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>
                <Form.Group controlId="factSecond">
                  <Col sm={10}>
                    <Row>
                      <Col sm={4}>
                        <Form.Control type="text" placeholder="factId" name="factId" required value={this.state.factId} disabled />
                      </Col>
                      <Col sm={4}>
                        <Form.Control type="text" placeholder="Road head" name="roadHead" onChange={this.handleGenericOnChange} value={this.state.roadHead} />
                      </Col>
                      <Col sm={4}>
                        <Form.Control type="text" placeholder="Rail head" name="railHead" onChange={this.handleGenericOnChange} value={this.state.railHead} />
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>

                <Form.Group controlId="conatctFirst">
                  <Col sm={10}>
                    <Row>
                      <Col sm={6}>
                        <Form.Control type="email" placeholder="Email" required name="email" onChange={this.handleGenericOnChange} value={this.state.email} />
                      </Col>
                      <Col sm={6}>
                        <Form.Control type="text" placeholder="Mobile" required name="mobile" onChange={this.handleGenericOnChange} value={this.state.mobile} />
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>
                <Form.Group controlId="contactSecond">
                  <Col sm={10}>
                    <Row>
                      <Col sm={4}>
                        <Form.Control type="text" placeholder="contactId" name="contactId" required value={this.state.contactId} disabled />
                      </Col>
                      <Col sm={4}>
                        <Form.Control type="text" placeholder="Landline" name="landline" onChange={this.handleGenericOnChange} value={this.state.landline} />
                      </Col>
                      <Col sm={4}>
                        <Form.Control type="text" placeholder="Alternate" name="alternate" onChange={this.handleGenericOnChange} value={this.state.alternate} />
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>

                <Form.Group controlId="location">
                  <Col sm={10}>
                    <Row>
                      <Col sm={4}>
                        <Form.Control type="text" placeholder="locationId" name="locationId" required value={this.state.locationId} disabled />
                      </Col>
                      <Col sm={4}>
                        <Form.Control type="text" placeholder="Pincode" required name="pincode" onChange={this.handleGenericOnChange} value={this.state.pincode} />
                      </Col>
                      <Col sm={4}>
                        <Form.Control type="text" placeholder="Address" required name="address" onChange={this.handleGenericOnChange} value={this.state.address} />
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6} md={6}>
                <Form.Group controlId="assets">
                  <Col sm={10}>
                    {
                      this.state.assets.map((element, i) => {
                        return (
                          <Row key={i}>
                            <Col sm={10} >
                              <Form.Control type="text" placeholder={"Asset" + i} onChange={this.changeGenericDynamicFields(i, "assets", "url")} value={element['url']} />
                            </Col>
                            <Col sm={2}>
                              <Button size="sm" variant="secondary" onClick={() => this.removeGenericDynamicField(i, "assets")} >Remove</Button>
                            </Col>
                          </Row>
                        );
                      })
                    }
                    <div className="text-right">
                      <Button size="sm" variant="secondary" onClick={() => this.addGenericDynamicField("assets", assetsBase)}>Add</Button>
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group controlId="inclusions">
                  <Col sm={10}>
                    {
                      this.state.inclusions.map((element, i) => {
                        return (
                          <Row key={i}>
                            <Col sm={10} >
                              <Form.Control type="text" placeholder={"Inclusions" + i} onChange={this.changeGenericDynamicFields(i, "inclusions", "include")} value={element['include']} />
                            </Col>
                            <Col sm={2}>
                              <Button size="sm" variant="secondary" onClick={() => this.removeGenericDynamicField(i, "inclusions")} >Remove</Button>
                            </Col>
                          </Row>
                        );
                      })
                    }
                    <div className="text-right">
                      <Button size="sm" variant="secondary" onClick={() => this.addGenericDynamicField("inclusions", inclusionBase)}>Add</Button>
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group controlId="instuctions">
                  <Col sm={10}>
                    {
                      this.state.instuctions.map((element, i) => {
                        return (
                          <Row key={i}>
                            <Col sm={10} >
                              <Form.Control type="text" placeholder={"instuctions" + i} onChange={this.changeGenericDynamicFields(i, "instuctions", "instuction")} value={element['instuction']} />
                            </Col>
                            <Col sm={2}>
                              <Button size="sm" variant="secondary" onClick={() => this.removeGenericDynamicField(i, "instuctions")} >Remove</Button>
                            </Col>
                          </Row>
                        );
                      })
                    }
                    <div className="text-right">
                      <Button size="sm" variant="secondary" onClick={() => this.addGenericDynamicField("instuctions", instuctionBase)}>Add</Button>
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group controlId="thingsToCarry">
                  <Col sm={10}>
                    {
                      this.state.thingsToCarry.map((element, i) => {
                        return (
                          <Row key={i}>
                            <Col sm={10} >
                              <Form.Control type="text" placeholder={"thingsToCarry" + i} onChange={this.changeGenericDynamicFields(i, "thingsToCarry", "thing")} value={element['thing']} />
                            </Col>
                            <Col sm={2}>
                              <Button size="sm" variant="secondary" onClick={() => this.removeGenericDynamicField(i, "thingsToCarry")} >Remove</Button>
                            </Col>
                          </Row>
                        );
                      })
                    }
                    <div className="text-right">
                      <Button size="sm" variant="secondary" onClick={() => this.addGenericDynamicField("thingsToCarry", thingsToCarryBase)}>Add</Button>
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group controlId="itineraries">
                  <Col sm={10}>
                    {
                      this.state.itineraries.map((element, i) => {
                        return (
                          <div key={i}>
                            <Row>
                              <Col sm={6} >
                                <DateTime dateFormat="DD/MM/YYYY" inputProps={{ placeholder: 'Time' + i }} onChange={this.changeDate(i, "itineraries", "date")} value={element['date']} />
                              </Col>
                              <Col sm={6} >
                                <Form.Control type="text" placeholder={"Heading" + i} onChange={this.changeGenericDynamicFields(i, "itineraries", "heading")} value={element['heading']} />
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col sm={10} >
                                <Form.Control type="text" placeholder={"Body" + i} onChange={this.changeGenericDynamicFields(i, "itineraries", "body")} value={element['body']} />
                              </Col>
                              <Col sm={2}>
                                <Button size="sm" variant="secondary" onClick={() => this.removeGenericDynamicField(i, "itineraries")} >Remove</Button>
                              </Col>
                            </Row>

                          </div>
                        );
                      })
                    }
                    <div className="text-right">
                      <Button size="sm" variant="secondary" onClick={() => this.addGenericDynamicField("itineraries", itineraryBase)}>Add</Button>
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group>
                  <Col sm={8}>
                    <Button type="submit">Update</Button>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log("states : ", state);
  return {
    campaign: state.events.campaign,
    message: state.events.message,
    isCreating: state.events.isCreating
  };
}

export default connect(mapStateToProps)(Details);