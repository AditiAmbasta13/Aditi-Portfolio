Get-ChildItem -Path "src" -Recurse -Include *.tsx,*.ts,*.css | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'red-|#EF4444') {
        $content = $content -replace 'red-400', 'blue-500'
        $content = $content -replace 'red-500', 'blue-600'
        $content = $content -replace 'red-600', 'blue-700'
        $content = $content -replace 'red-50', 'blue-50'
        $content = $content -replace '#EF4444', '#2563EB'
        Set-Content $_.FullName $content -NoNewline
        Write-Host "Updated: $($_.Name)"
    }
}
