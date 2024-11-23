"use client";

const plugins = [
  // Core editing features*/}
  "anchor",
  "autolink",
  "charmap",
  "codesample",
  "emoticons",
  "image",
  "link",
  "lists",
  "media",
  "searchreplace",
  "table",
  "visualblocks",
  "wordcount",
  // Your account includes a free trial of TinyMCE premium features
  // Try the most popular premium features until Nov 18, 2024:
  "checklist",
  "mediaembed",
  "casechange",
  "export",
  "formatpainter",
  "pageembed",
  "a11ychecker",
  "tinymcespellchecker",
  "permanentpen",
  "powerpaste",
  "advtable",
  "advcode",
  "editimage",
  "advtemplate",
  "ai",
  "mentions",
  "tinycomments",
  "tableofcontents",
  "footnotes",
  "mergetags",
  "autocorrect",
  "typography",
  "inlinecss",
  "markdown",
  // Early access to document converters
  "importword",
  "exportword",
  "exportpdf",
];
const toolbar =
  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat";
const mergetags_list = [
  { value: "First.Name", title: "First Name" },
  { value: "Email", title: "Email" },
];

import { Box } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

// TinyMCE so the global var exists
import "tinymce/tinymce";
// DOM model
import "tinymce/models/dom/model";
// Theme
import "tinymce/themes/silver";
// Toolbar icons
import "tinymce/icons/default";
// Editor styles
import "tinymce/skins/ui/oxide/skin";

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/help/js/i18n/keynav/en";
import "tinymce/plugins/image";
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

// importing plugin resources
import "tinymce/plugins/emoticons/js/emojis";

// Content styles, including inline UI like fake cursors
import "tinymce/skins/content/default/content";
import "tinymce/skins/ui/oxide/content";

function TinyMceEditor(props) {
  const { initialValue, disabled, onDataChange } = props;
  const [_, options] = useTranslation();
  const [value, setValue] = useState(initialValue ?? "");
  const editorRef = useRef(null);

  useEffect(() => setValue(initialValue ?? ""), [initialValue]);

  useEffect(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current.editor;
    const application = editor.container;
    const editorContainer = application?.firstElementChild;
    const toolbarContainer = editorContainer?.firstElementChild;
    const promotionBtn = toolbarContainer?.firstElementChild;
    if (promotionBtn) {
      promotionBtn.style.display = "none";
    }
  }, [editorRef.current]);

  return (
    <Box
      sx={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? "0.4" : "1",
      }}
    >
      <Editor
        tinymceScriptSrc={editorRef.current}
        apiKey={"gpl"}
        ref={editorRef}
        init={{
          plugins,
          toolbar,
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list,
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
          exportpdf_converter_options: {
            format: "Letter",
            margin_top: "1in",
            margin_right: "1in",
            margin_bottom: "1in",
            margin_left: "1in",
          },
          exportword_converter_options: { document: { size: "Letter" } },
          importword_converter_options: {
            formatting: {
              styles: "inline",
              resets: "inline",
              defaults: "inline",
            },
          },
          directionality: "rtl",
          language: options.language,
          language_url:
            "https://cdn.tiny.cloud/1/no-api-key/tinymce/7.5.0-112/langs/ar.js",
        }}
        disabled={disabled}
        value={value}
        onEditorChange={(newValue, e) => {
          setValue(newValue);
          onDataChange?.(newValue);
        }}
        initialValue={initialValue}
      ></Editor>
    </Box>
  );
}

export default TinyMceEditor;
