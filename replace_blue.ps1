$files = Get-ChildItem -Recurse -Path "src" -Include "*.tsx","*.ts","*.css","*.js"
foreach ($file in $files) {
    $c = Get-Content $file.FullName -Raw
    $n = $c `
        -replace '#EA580C', '#2563EB' `
        -replace 'text-orange-600', 'text-blue-600' `
        -replace 'text-orange-700', 'text-blue-700' `
        -replace 'text-orange-500', 'text-blue-500' `
        -replace 'bg-orange-600', 'bg-blue-600' `
        -replace 'bg-orange-500', 'bg-blue-500' `
        -replace 'bg-orange-50', 'bg-blue-50' `
        -replace 'border-orange-600', 'border-blue-600' `
        -replace 'hover:border-orange-600', 'hover:border-blue-600' `
        -replace 'hover:text-orange-600', 'hover:text-blue-600' `
        -replace 'group-hover:text-orange-600', 'group-hover:text-blue-600' `
        -replace 'stopColor="#EA580C"', 'stopColor="#2563EB"' `
        -replace "stopColor='#EA580C'", "stopColor='#2563EB'" `
        -replace 'stroke="#EA580C"', 'stroke="#2563EB"'
    if ($n -ne $c) {
        Set-Content $file.FullName $n -NoNewline
        Write-Host "Reverted: $($file.Name)"
    }
}
Write-Host "Done."
