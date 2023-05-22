module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const experiencesItemSchema = new Schema({
    companyName: {
      type: "string",
      min: 2,
      max: 50,
    },
    startTime: {
      type: "number",
      default: 0,
    },
    endTime: {
      type: "number",
      default: 0,
    },
    projectContent: {
      type: "string",
      min: 1,
      max: 5000,
    },
    technologyStack: {
      type: "string",
      min: 2,
      max: 100,
    },
  });
  const projectExpSchema = new Schema({
    department: {
      type: "string",
      min: 2,
      max: 20,
      format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,20}$/,
    },
    startTime: { type: "number", default: 0 },
    endTime: { type: "number", default: 0 },
    job: {
      type: "string",
      min: 2,
      max: 20,
      format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,20}$/,
    },
    projectDesc: {
      type: "string",
      min: 1,
      max: 5000,
    },
    projectName: {
      type: "string",
      min: 1,
      max: 100,
      format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{1,100}$/,
    },
    projectTags: {
      type: "array",
      itemType: "string",
    },
  });
  const ResumeSchema = new Schema(
    {
      name: {
        type: "string",
        min: 2,
        max: 20,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,20}$/,
      },
      avatar: {
        type: "string",
        required: false,
      },
      status: {
        type: "boolean",
        default: true,
      },
      createTime: {
        type: "number",
        default: 0,
      },
      updateTime: {
        type: "number",
        default: 0,
      },
      city: {
        type: "string",
        min: 2,
        max: 50,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,50}$/,
      },
      education: {
        type: "string",
        min: 2,
        max: 10,
        required: false,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,10}$/,
      },
      email: {
        type: "string",
        required: true,
        match: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      },
      experience: {
        type: "string",
        min: 1,
        max: 2,
      },
      experiences: {
        type: "array",
        itemType: experiencesItemSchema,
        required: false,
      },
      projectExp: {
        type: "array",
        itemType: projectExpSchema,
        required: false,
      },
      gender: {
        type: "string",
        required: true,
      },
      jobName: {
        type: "string",
        min: 2,
        max: 20,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,20}$/,
      },
      jobStatus: {
        type: "string",
        min: 2,
        max: 30,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,30}$/,
      },
      jobType: {
        type: "string",
        min: 2,
        max: 10,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,10}$/,
      },
      mobile: {
        type: "string",
        required: true,
        format: /^[0-9]*$/,
      },
      salary: {
        type: "string",
        required: true,
        format: /^[0-9]*$/,
      },
      summary: {
        type: "string",
        min: 1,
        max: 5000,
        required: false,
      },
      weChat: {
        type: "string",
        required: false,
      },
    },
    {
      collection: "resume",
      versionKey: false,
    }
  );

  return mongoose.model("Resume", ResumeSchema);
};
