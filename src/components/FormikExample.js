import React from "react";
import { Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { KeyboardDatePicker } from "@material-ui/pickers";
import * as Yup from 'yup';
const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <KeyboardDatePicker
      clearable
      disablePast
      name={field.name}
      value={field.value}
      format="dd/MM/yyyy"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={error => {
        // handle as a side effect
        if (error !== currentError) {
          form.setFieldError(field.name, error);
        }
      }}
      // if you are using custom validation schema you probably want to pass `true` as third argument
      onChange={date => form.setFieldValue(field.name, date, false)}
      {...other}
    />
  );
};

const FormikExample = () => {
  return (
    <Formik
      onSubmit={console.log}
      initialValues={{ date: new Date() }}
      validationSchema={
        Yup.object().shape({
        date: Yup.date()
      })}

      >
      {({ values, errors }) => (
        <Form>
          <Grid container>
            <Grid item container justify="center" xs={12}>
              <Field name="date" component={DatePickerField} />
            </Grid>

            <Grid item xs={12} sm={12} style={{ margin: "24px" }}>
            <h1>test</h1>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default FormikExample;
