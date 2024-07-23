
import { SelectValue, SelectTrigger, SelectLabel, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"

export function SkillsSelect({ className, onSelectChange, index, value }) {
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
          <SelectLabel>Skill Level</SelectLabel>
          <SelectItem value="beginner" onSelect={handleSelectChange}>Beginner</SelectItem>
          <SelectItem value="intermediate" onSelect={handleSelectChange}>Intermediate</SelectItem>
          <SelectItem value="advanced" onSelect={handleSelectChange}>Advanced</SelectItem>
          <SelectItem value="expert" onSelect={handleSelectChange}>Expert</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
