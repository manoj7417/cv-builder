import { SelectValue, SelectTrigger, SelectLabel, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"
function LanguageSelect({ className, onSelectChange, index, value }) {
    const handleSelectChange = (value) => {
        onSelectChange(value, index);
    };
    return (
        <Select value={value || "beginner"} onValueChange={handleSelectChange} >
            <SelectTrigger className={`${className}`}>
                <SelectValue placeholder="Select skill level" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Language Level</SelectLabel>
                    <SelectItem value="basic" onSelect={handleSelectChange}>Basic</SelectItem>
                    <SelectItem value="conversational" onSelect={handleSelectChange}>Conversational</SelectItem>
                    <SelectItem value="proficient" onSelect={handleSelectChange}>Proficient</SelectItem>
                    <SelectItem value="fluent" onSelect={handleSelectChange}>Fluent</SelectItem>
                    <SelectItem value="native" onSelect={handleSelectChange}>Native/Bilingual</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default LanguageSelect