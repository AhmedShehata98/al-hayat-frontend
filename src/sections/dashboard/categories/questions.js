import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useState } from "react";
import PropTypes from "prop-types";
import useTranslateCategory from "../../../hooks/use-translate-category";

const Questions = ({ questionsList, setQuestionsList }) => {
  const { translatedCategory } = useTranslateCategory();
  const [questionValue, setQuestionValue] = useState("");

  function handleAddNewQuestion() {
    setQuestionsList((prevElem) => [...prevElem, questionValue?.trim()]);
    setQuestionValue("");
  }
  function handleRemoveQuestion(question) {
    setQuestionsList((prevElem) =>
      prevElem.filter(
        (ques) => ques.trim().toLowerCase() !== question.trim().toLowerCase()
      )
    );
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
              {translatedCategory.createCategory.form.questions.title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <TextField
                  //   error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  //   helperText={formik.touched.name && formik.errors.name}
                  label={
                    translatedCategory.createCategory.form.questions.questions
                  }
                  name="question"
                  //   onBlur={formik.handleBlur}
                  onChange={(ev) => setQuestionValue(ev.target.value)}
                  value={questionValue}
                />

                <Button onClick={handleAddNewQuestion}>
                  {translatedCategory.createCategory.form.questions.addBtn}
                </Button>
              </Box>
              {questionsList.length > 0 && (
                <>
                  <Typography variant="overline">
                    {translatedCategory.createCategory.form.questions.list} :
                  </Typography>
                  <Grid width="100%" xs={12} sm={12} component={"ul"}>
                    {questionsList.map((question, idx) => (
                      <Grid key={idx} item component={"li"}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "1.5rem",
                          }}
                        >
                          <Typography variant="subtitle2">
                            {question}
                          </Typography>
                          <Button
                            size={"small"}
                            color="error"
                            onClick={() => handleRemoveQuestion(question)}
                          >
                            <DeleteForever />
                          </Button>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Questions;
Questions.prototype = {
  questionsList: PropTypes.array.isRequired,
  setQuestionsList: PropTypes.func.isRequired,
};
