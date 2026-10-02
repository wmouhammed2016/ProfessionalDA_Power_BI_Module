# Data Files

Sample files for the Power BI "Extract Data from Different Sources" lecture.

| File | Used for |
|---|---|
| `sales_orders.json` | Demo: connecting Power BI to a JSON file |

The instructor's CSV and Excel files go in this folder too.

## `sales_orders.json`

Fictional web-store orders, written for this course. Names, cities and prices are made up, so do not use them as real figures.

- 20 orders, 36 order lines
- The file is one JSON array: Power BI sees it as a **list of records**

| Field | Type | What it teaches |
|---|---|---|
| `order_id` | number | A plain column |
| `order_date` | text (`"2025-01-06"`) | Dates arrive as text: change the type in Power Query |
| `customer` | record: `id`, `name`, `city`, `country` | A nested record: expand it into columns |
| `shipped_date` | text or `null` | 3 orders are not shipped yet, so the value is `null` |
| `discount` | number, `null`, or missing | 9 orders have `null`; order 1005 has no `discount` field at all |
| `items` | list of records: `product`, `category`, `quantity`, `unit_price` | A nested list: expand it to new rows (one row per order line) |

Other details to point out: order 1012 has a customer with a `null` city.

### Demo steps (written for this course; menu names can differ between Power BI versions)

1. **Home > Get data > JSON**, then pick `sales_orders.json`.
2. Power Query opens on a **List**. Use **To Table** (no delimiter), then expand the **Record** column to get the order fields.
3. Expand the `customer` column (a record) into columns.
4. Expand the `items` column (a list) **to new rows**, then expand the records inside.
5. Change `order_date` and `shipped_date` to the **Date** type, and `quantity` and `unit_price` to numbers.
6. Check the result: 36 rows, one per order line.
7. **Close & Apply**.

## API demo (not a file)

The lecture also connects to an open API with the **Web** connector. The demo URL is in the activity file. Run it once in Power BI Desktop before class.
