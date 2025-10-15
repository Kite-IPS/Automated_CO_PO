import ExcelJS from 'exceljs';
import CoPo from '../Models/copoModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Helper function to generate Excel sheet
const generateExcelSheet = async (copoData) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Course Attainment');

  // Set column widths
  worksheet.columns = [
    { header: 'Course Code', key: 'course_code', width: 15 },
    { header: 'Course Name', key: 'course_name', width: 20 },
    { header: 'Faculty Name', key: 'faculty_name', width: 18 },
    { header: 'Academic Year', key: 'academic_year', width: 15 },
    { header: 'Semester', key: 'semester', width: 12 },
    { header: 'Programme', key: 'programme', width: 15 },
    { header: 'Year', key: 'year', width: 8 },
    { header: 'Regulation', key: 'regulation', width: 12 },
    { header: 'Students', key: 'numStudents', width: 12 },
  ];

  // Add header row with styling
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
  headerRow.alignment = { horizontal: 'center', vertical: 'center' };

  // Add course details
  worksheet.addRow({
    course_code: copoData.course_code,
    course_name: copoData.course_name,
    faculty_name: copoData.faculty_name,
    academic_year: copoData.academic_year,
    semester: copoData.semester,
    programme: copoData.programme,
    year: copoData.year,
    regulation: copoData.regulation,
    numStudents: copoData.numStudents,
  });

  // Add questions section
  worksheet.addRow([]);
  const questionHeaderRow = worksheet.addRow([
    'Part', 'Question No', 'Marks', 'CO Mapping', 'PO Mapping'
  ]);
  questionHeaderRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  questionHeaderRow.fill = { type: 'pattern', pattern: 'solid', fgColor: 'FF70AD47' };

  copoData.questions.forEach((q) => {
    worksheet.addRow([
      q.part,
      q.question_no,
      q.marks,
      q.co_mapping.join(', '),
      q.po_mapping.join(', '),
    ]);
  });

  // Generate file path
  const fileName = `${copoData.course_code}_${Date.now()}.xlsx`;
  const filePath = path.join(uploadsDir, fileName);

  await workbook.xlsx.writeFile(filePath);
  return { fileName, filePath };
};

// 1. Create Attainment Sheet
export const createAttainmentSheet = async (req, res) => {
  try {
    const { course_code, course_name, faculty_name, academic_year, semester, programme, year, regulation, numStudents, numParts, assessment_name, questions } = req.body;
    const userId = req.user._id; // Using _id from the user object

    if (!course_code || !course_name || !academic_year || !semester || !programme || !year || !regulation || !numStudents || !numParts || !assessment_name || !questions || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (questions.length === 0) {
      return res.status(400).json({ message: 'At least one question is required' });
    }

    // Create CoPo document
    const copoDoc = new CoPo({
      course_code,
      course_name,
      faculty_name,
      academic_year,
      semester,
      programme,
      year,
      regulation,
      numStudents,
      numParts,
      assessment_name,
      questions,
      userId,
    });

    // Generate Excel sheet
    const { fileName } = await generateExcelSheet(copoDoc);
    copoDoc.file_path = fileName;

    // Save to database
    const savedCoPo = await copoDoc.save();

    res.status(201).json({
      message: 'Attainment sheet created successfully',
      data: savedCoPo,
      fileName,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating attainment sheet', error: error.message });
  }
};

// 2. Get all Attainment Sheets by User
export const getAttainmentSheets = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const sheets = await CoPo.find({ userId }).sort({ createdAt: -1 });

    if (sheets.length === 0) {
      return res.status(404).json({ message: 'No attainment sheets found' });
    }

    res.status(200).json({
      message: 'Attainment sheets retrieved successfully',
      data: sheets,
      count: sheets.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving attainment sheets', error: error.message });
  }
};

// 3. Get Particular Attainment Sheet
export const getAttainmentSheetById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Sheet ID is required' });
    }

    const sheet = await CoPo.findById(id);

    if (!sheet) {
      return res.status(404).json({ message: 'Attainment sheet not found' });
    }

    res.status(200).json({
      message: 'Attainment sheet retrieved successfully',
      data: sheet,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving attainment sheet', error: error.message });
  }
};

// 4. Update and Regenerate Attainment Sheet
export const updateAttainmentSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Sheet ID is required' });
    }

    // Find and update
    const sheet = await CoPo.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!sheet) {
      return res.status(404).json({ message: 'Attainment sheet not found' });
    }

    // Regenerate Excel sheet
    const { fileName } = await generateExcelSheet(sheet);

    // Delete old file if exists
    if (sheet.file_path) {
      const oldPath = path.join(uploadsDir, sheet.file_path);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Update file path
    sheet.file_path = fileName;
    await sheet.save();

    res.status(200).json({
      message: 'Attainment sheet updated and regenerated successfully',
      data: sheet,
      fileName,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating attainment sheet', error: error.message });
  }
};

// 5. Delete Attainment Sheet
export const deleteAttainmentSheet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Sheet ID is required' });
    }

    const sheet = await CoPo.findByIdAndDelete(id);

    if (!sheet) {
      return res.status(404).json({ message: 'Attainment sheet not found' });
    }

    // Delete associated Excel file
    if (sheet.file_path) {
      const filePath = path.join(uploadsDir, sheet.file_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(200).json({ message: 'Attainment sheet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attainment sheet', error: error.message });
  }
};

// Helper function to download Excel file
export const downloadAttainmentSheet = async (req, res) => {
  try {
    const { id } = req.params;

    const sheet = await CoPo.findById(id);

    if (!sheet || !sheet.file_path) {
      return res.status(404).json({ message: 'File not found' });
    }

    const filePath = path.join(uploadsDir, sheet.file_path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    res.download(filePath, `${sheet.course_code}_attainment.xlsx`);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading file', error: error.message });
  }
};