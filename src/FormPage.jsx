// FormPage.jsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

const initialValues = {
  name: '',
  email: '',
  password: '',
  agree: false
};

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const errorMessages = {
  name: "En az 3 karakter giriniz",
  email: "Geçerli bir email adresi giriniz",
  password: "En az 1 büyük 1 küçük harf, 1 sembol ve 1 sayı içeren şifre giriniz",
  agree: "Koşul ve sorumlulukları kabule ediyorum kutusunu işaretleyiniz"
};

function FormPage() {
  const [formData, setFormData] = useState(initialValues);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    agree: false
  });
  const history = useHistory();

  useEffect(() => {
    const isFormValid = formData.name.trim().length >= 3 &&
      regexEmail.test(formData.email) &&
      regexPassword.test(formData.password) &&
      formData.agree;

    setIsValid(isFormValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (name === 'name') {
      setErrors({
        ...errors,
        [name]: value.trim().length < 3
      });
    } else if (name === 'email') {
      setErrors({
        ...errors,
        [name]: !regexEmail.test(value)
      });
    } else if (name === 'password') {
      setErrors({
        ...errors,
        [name]: !regexPassword.test(value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      history.push('/success');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '18rem' }}>
        <CardBody>
          <CardTitle tag="h5">Registration Form</CardTitle>
        </CardBody>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Ad Soyad:</Label>
              <Input
                id="name"
                name="name"
                placeholder="Adınızı ve soyadınızı giriniz"
                type="text"
                value={formData.name}
                onChange={handleChange}
                invalid={errors.name}
                data-cy="name-input"
              />
              {errors.name && <FormFeedback>{errorMessages.name}</FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                id="email"
                name="email"
                placeholder="E-mail adresinizi giriniz"
                type="email"
                value={formData.email}
                onChange={handleChange}
                invalid={errors.email}
                data-cy="email-input"
              />
              {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Label for="password">Şifre:</Label>
              <Input
                id="password"
                name="password"
                placeholder="Güçlü bir şifre giriniz"
                type="password"
                value={formData.password}
                onChange={handleChange}
                invalid={errors.password}
                data-cy="password-input"
              />
              {errors.password && <FormFeedback>{errorMessages.password}</FormFeedback>}
            </FormGroup>

            <FormGroup check>
              <Input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                invalid={errors.agree}
                data-cy="terms-input"
              />
              {' '}
              <Label check>Şartları ve sorumlulukları kabul ediyorum.</Label>
              {errors.agree && <FormFeedback>{errorMessages.agree}</FormFeedback>}
            </FormGroup>

            <Button color="primary" type="submit" disabled={!isValid}>Gönder</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default FormPage;
