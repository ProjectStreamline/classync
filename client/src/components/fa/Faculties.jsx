import FacultyCard from './FacultyCard';

const Faculties = () => {
  const faculties = [
    {
      name: 'Dr. Nishant Namdev',
      position: 'Adjunct Asst. Prof',
      courses: 4,
      department: 'Basic Science',
      code: '123456',
      joiningDate: '2nd April 2022',
      status: 'Permanent',
      subjects: ['PS', 'ILA', 'CDS'],
      contact: '1234567890',
      email: 'abc@iiitn.ac.in',
    },
    {
      name: 'Dr. Kamaljeet',
      position: 'Adjunct Asst. Prof',
      courses: 5,
      department: 'Basic Science',
      code: '123456',
      joiningDate: '2nd April 2022',
      status: 'Permanent',
      subjects: ['PS', 'ILA', 'CDS'],
      contact: '1234567890',
      email: 'abc@iiitn.ac.in',
    },
    {
      name: 'Mr. Vikrant Dhenge',
      position: 'Adjunct Asst. Prof',
      courses: 6,
      department: 'Basic Science',
      code: '123456',
      joiningDate: '2nd April 2022',
      status: 'Permanent',
      subjects: ['PS', 'ILA', 'CDS'],
      contact: '1234567890',
      email: 'abc@iiitn.ac.in',
    },
    {
      name: 'Dr. Chandrashekhar Kamargaonkar',
      position: 'Adjunct Asst. Prof',
      courses: 6,
      department: 'Electronics',
      code: '123456',
      joiningDate: '2nd April 2022',
      status: 'Permanent',
      subjects: ['PS', 'ILA', 'CDS'],
      contact: '1234567890',
      email: 'abc@iiitn.ac.in',
    },
    {
      name: 'Dr. Nishant Namdev',
      position: 'Adjunct Asst. Prof',
      courses: 4,
      department: 'Basic Science',
      code: '123456',
      joiningDate: '2nd April 2022',
      status: 'Permanent',
      subjects: ['PS', 'ILA', 'CDS'],
      contact: '1234567890',
      email: 'abc@iiitn.ac.in',
    },
    {
      name: 'Dr. Kamaljeet',
      position: 'Adjunct Asst. Prof',
      courses: 5,
      department: 'Basic Science',
      code: '123456',
      joiningDate: '2nd April 2022',
      status: 'Permanent',
      subjects: ['PS', 'ILA', 'CDS'],
      contact: '1234567890',
      email: 'abc@iiitn.ac.in',
    },
    {
      name: 'Mr. Vikrant Dhenge',
      position: 'Adjunct Asst. Prof',
      courses: 6,
      department: 'Basic Science',
      code: '123456',
      joiningDate: '2nd April 2022',
      status: 'Permanent',
      subjects: ['PS', 'ILA', 'CDS'],
      contact: '1234567890',
      email: 'abc@iiitn.ac.in',
    },
    {
      name: 'Mr. Vikrant Dhenge',
      position: 'Adjunct Asst. Prof',
      courses: 6,
      department: 'Basic Science',
      code: '123456',
      joiningDate: '2nd April 2022',
      status: 'Permanent',
      subjects: ['PS', 'ILA', 'CDS'],
      contact: '1234567890',
      email: 'abc@iiitn.ac.in',
    },
    // Add more faculties as needed
  ];
  return (
    <div className="flex flex-col w-[40%] m-8 ml-0 bg-card-bg rounded-xl">
      <h2 className="text-2xl font-bold m-4">Available Faculties</h2>
      {/* <div className="m-4 mt-0">
        <input
          type="text"
          placeholder="Search for a course"
          className="flex-1 p-2 rounded-xl border w-full"
        />
      </div> */}
      <div className="flex-1 items-center w-auto h-[400px] overflow-auto no-scrollbar">
        {faculties.map((faculty, index) => (
          <FacultyCard key={index} faculty={faculty} />
        ))}
      </div>
    </div>
  );
};

export default Faculties;
