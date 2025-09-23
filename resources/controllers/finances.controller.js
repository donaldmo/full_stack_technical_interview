const xlsx = require('xlsx');
const FinancialRecordDAO = require('../dao/financial-record.dao');


const monthMap = {
  january: 1, february: 2, march: 3, april: 4,
  may: 5, june: 6, july: 7, august: 8,
  september: 9, october: 10, november: 11, december: 12
};

function normalizeMonth(value) {
  if (!value) return null;

  if (typeof value === 'number') return value;
  if (!isNaN(parseInt(value))) return parseInt(value);

  const key = String(value).trim().toLowerCase();
  return monthMap[key] || null;
}

async function uploadExelFile(req, res) {
  try {
    const file = req.file;
    const userId = parseInt(req.params.userId);
    const year = parseInt(req.params.year);

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const records = [];
    const invalidRows = [];

    for (const row of rows) {
      const month = normalizeMonth(row.month);
      const amount = parseFloat(row.amount);

      if (!month || isNaN(amount)) {
        invalidRows.push(row);
        continue;
      }

      records.push({ user_id: userId, year, month, amount });
    }

    const insertedCount = await FinancialRecordDAO.bulkInsert(records);

    res.status(200).json({
      message: 'Excel file uploaded and processed successfully',
      fileName: file.originalname,
      totalRows: rows.length,
      insertedRows: insertedCount,
      skippedRows: invalidRows.length,
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getFinancialRecords(req, res) {
  try {
    /**
     * TODO:
     * change req.query to req.params
     */
    const { userId, year } = req.query;
    console.log('getFinancialRecords', userId, year)

    let records;

    if (userId && year) {
      records = await FinancialRecordDAO.getRecordsByUserAndYear(
        parseInt(userId),
        parseInt(year)
      );
    } else {
      records = await FinancialRecordDAO.getFinancialRecords();
    }

    res.status(200).json({
      total: records.length,
      records,
    });
  } catch (error) {
    console.error('Error fetching financial records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getFinancialRecords,
};

module.exports = {
  uploadExelFile,
  getFinancialRecords,
};
