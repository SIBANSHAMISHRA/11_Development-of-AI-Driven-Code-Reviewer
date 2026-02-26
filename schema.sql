CREATE TABLE review_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT,
    function_count INTEGER,
    issue_count INTEGER,
    reviewed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
