import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Button, Modal, FormGroup } from 'react-bootstrap';
import { addQuestion } from '../../actions/winterfellFormBuilderActions';
import FieldGroup from '../UI/FieldGroup';


class AddQuestionButton extends Component {
  static propTypes = {
    addQuestion: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      questionSetId: '',
      questionSetHeader: '',
      questionSetText: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onFormUpdate = this.onFormUpdate.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  onClose(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  onFormUpdate(e) {
    e.preventDefault();
    this.props.addQuestion(this.state.questionSetId, this.state.questionSetHeader, this.state.questionSetText);
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Row>
        <div className="static-modal">
          <Modal show={this.state.showModal}>
            <Modal.Header>
              <Modal.Title>Add a new question to the page</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <FormGroup>
                  <FieldGroup
                    id="questionSetId"
                    name="questionSetId"
                    label="Page ID"
                    onChange={this.onChange}
                    placeholder="(optional)"
                    value={this.state.questionSetId}
                  />
                </FormGroup>
                <FormGroup>
                  <FieldGroup
                    id="questionSetHeader"
                    name="questionSetHeader"
                    label="Page Title"
                    onChange={this.onChange}
                    placeholder=""
                    value={this.state.questionSetHeader}
                  />
                </FormGroup>
                <FormGroup>
                  <FieldGroup
                    id="questionSetText"
                    name="questionSetText"
                    label="Enter Page Description"
                    onChange={this.onChange}
                    placeholder=""
                    value={this.state.questionSetText}
                  />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                bsStyle="danger"
                onClick={() => { this.setState({ showModal: false }); }}
              >Cancel</Button>
              <Button
                bsStyle="primary"
                onClick={this.onFormUpdate}
              >Save changes</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <Col xs={12}>
          <Button
            className="btn btn-block btn-info"
            onClick={() => {
              this.setState({ showModal: true });
            }}
          >add page
          </Button>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.getIn(['form', 'currentForm', 'title']),
  };
}
export default connect(mapStateToProps, { addQuestion })(AddQuestionButton);

