import CalculatorButton from "@/components/Calculator/CalculatorButton";
import { NUMBERS, OPERATORS } from "@/helpers/Constants";
import { toast } from "sonner";

function CalculatorButtons({ setDisplayContent, displayContent }) {
  return (
    <div className="flex w-full h-full gap-2 py-2">
      <div className="grid grid-cols-4 gap-2 w-4/5">
        {NUMBERS.map((number, index) => (
          <CalculatorButton
            key={index}
            text={number}
            onPress={(value) => {
              setDisplayContent((prevValue) => prevValue + value);
            }}
          ></CalculatorButton>
        ))}
        <CalculatorButton
          text={"C"}
          onPress={() => {
            setDisplayContent("");
          }}
        />
      </div>
      <div className="flex flex-col gap-2 h-full w-1/5">
        <div className="grid grid-cols-2 gap-2 h-3/5">
          {OPERATORS.map((operator, index) => (
            <CalculatorButton
              key={index}
              text={operator}
              onPress={(value) => {
                setDisplayContent((prevValue) => prevValue + value);
              }}
            />
          ))}
        </div>
        <div className="h-2/5">
          <CalculatorButton
            text={"="}
            onPress={() => {
              try {
                setDisplayContent(eval(displayContent));
              } catch (error) {
                toast.warning(error.message);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CalculatorButtons;
