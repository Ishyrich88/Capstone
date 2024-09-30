import React from 'react';
import { useForm } from 'react-hook-form';

const AssetForm = ({ onSubmit }) => {
  // Using react-hook-form for form validation
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  // Watch the isRealTimeTracked field value
  const isRealTimeTracked = watch("isRealTimeTracked", false);

  const handleFormSubmit = (data) => {
    // Pass the form data to the onSubmit function
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Asset Name Field */}
      <div>
        <label>Asset Name</label>
        <input
          type="text"
          {...register("assetName", { required: true })}
        />
        {errors.assetName && <span className="error">Asset Name is required.</span>}
      </div>

      {/* Asset Type Dropdown */}
      <div>
        <label>Asset Type</label>
        <select {...register("assetType", { required: true })}>
          <option value="">Select Type</option>
          <option value="MANUAL">Manual</option>
          <option value="CRYPTO">Crypto</option>
          <option value="STOCK">Stock</option>
        </select>
        {errors.assetType && <span className="error">Asset Type is required.</span>}
      </div>

      {/* Real-Time Tracking Checkbox */}
      <div>
        <label>
          <input type="checkbox" {...register("isRealTimeTracked")} />
          Track in Real-Time
        </label>
      </div>

      {/* Symbol Field (Only for Real-Time Tracked Assets) */}
      {isRealTimeTracked && (
        <div>
          <label>Symbol</label>
          <input
            type="text"
            {...register("symbol", { required: isRealTimeTracked })}
          />
          {errors.symbol && <span className="error">Symbol is required for real-time tracked assets.</span>}
        </div>
      )}

      {/* Value Field (Disabled if Real-Time Tracked) */}
      <div>
        <label>Value</label>
        <input
          type="number"
          step="0.01"
          {...register("value", { 
            required: !isRealTimeTracked, 
            min: { value: 0, message: "Value must be a positive number" } 
          })}
          disabled={isRealTimeTracked}
        />
        {errors.value && <span className="error">{errors.value.message}</span>}
      </div>

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AssetForm;
