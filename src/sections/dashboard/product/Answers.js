import { Grid, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import useTranslateProducts from "../../../hooks/use-translate-products";
import { useRecoilState } from "recoil";
import { productsAtoms } from "../../../atoms/products-atoms";

const Answers = () => {
  const {
    translateProducts: {
      createPage: { forms: formsTranslation },
    },
  } = useTranslateProducts();
  const [{ answers, questions }, setProductsAtomState] =
    useRecoilState(productsAtoms);
  const [invalidField, setInvalidField] = useState([]);
  const compactQuestionsAndAnswers = useMemo(
    () =>
      questions.map((question, idx) => ({ question, answer: answers[idx] })),
    [questions, answers]
  );

  const handleChange = (ev, idx) => {
    setProductsAtomState((prevState) => {
      const newAnswersList = [...prevState.answers];
      newAnswersList[idx] = ev.target.value;

      return {
        ...prevState,
        answers: newAnswersList,
      };
    });
  };

  const checkFieldIsValid = (fieldName, fieldValue) => {
    if (!Boolean(fieldValue)) {
      setInvalidField((prev) => [...prev, fieldName]);
    } else {
      setInvalidField((prev) => [
        ...prev.filter((field) => field !== fieldName),
      ]);
    }
  };

  const handleBlur = (fieldName, fieldValue) =>
    checkFieldIsValid(fieldName, fieldValue);

  return (
    <form>
      <Grid
        container
        flexDirection={"column"}
        spacing={2}
        marginTop={1}
        paddingInline={"1rem"}
      >
        <Grid container xs={12} spacing={3} marginTop={1}>
          {/* FIXME: need fix */}
          {compactQuestionsAndAnswers &&
            compactQuestionsAndAnswers.length >= 1 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="overline">
                    {formsTranslation.categoryForm.inputs.answersList}
                  </Typography>
                </Grid>
                {compactQuestionsAndAnswers.map(({ question, answer }, idx) => (
                  <Grid key={idx} item xs={12} sm={12}>
                    <TextField
                      error={invalidField.includes(`answers.${idx}`)}
                      fullWidth
                      name={`answers.${idx}`}
                      label={question}
                      onChange={(ev) => handleChange(ev, idx)}
                      onBlur={() =>
                        handleBlur(`answers.${idx}`, answers?.[idx])
                      }
                      helperText={
                        invalidField.includes(`answers.${idx}`) &&
                        "this field answer is required"
                      }
                      value={answer}
                    />
                  </Grid>
                ))}
              </>
            )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Answers;
